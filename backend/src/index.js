const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5001;
const DB_PATH = path.join(__dirname, "data", "db.json");

app.use(cors());
app.use(express.json({ limit: "50mb" })); // support base64 image uploads

// Helper to read database
function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database file, using fallback:", error);
    return { items: [], matches: [], notifications: [], activities: [], stats: { reported: 0, found: 0, returned: 0, matches: 0 } };
  }
}

// Helper to write database
function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing database file:", error);
  }
}

// Matching Algorithm
function runMatching(newItem, db) {
  const oppositeType = newItem.type === "lost" ? "found" : "lost";
  const candidates = db.items.filter(
    (item) => item.type === oppositeType && item.status === "active"
  );

  candidates.forEach((candidate) => {
    let score = 0;
    
    // Category match
    const categoryScore = candidate.category === newItem.category ? 100 : 0;
    if (categoryScore > 0) score += 40;

    // Location match
    const locationScore = candidate.location === newItem.location ? 100 : 0;
    if (locationScore > 0) score += 30;

    // Date proximity (within 3 days)
    let dateScore = 0;
    const diffTime = Math.abs(new Date(candidate.date) - new Date(newItem.date));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 3) {
      dateScore = 100;
      score += 15;
    } else if (diffDays <= 7) {
      dateScore = 50;
      score += 8;
    }

    // Name text overlap
    let descScore = 0;
    const wordsNew = new Set(newItem.name.toLowerCase().split(/\s+/).filter(w => w.length > 2));
    const wordsCandidate = new Set(candidate.name.toLowerCase().split(/\s+/).filter(w => w.length > 2));
    let intersection = 0;
    wordsNew.forEach(w => {
      if (wordsCandidate.has(w)) intersection++;
    });
    if (wordsNew.size > 0 && intersection > 0) {
      descScore = Math.round((intersection / Math.max(wordsNew.size, wordsCandidate.size)) * 100);
      score += Math.min(15, intersection * 8);
    }

    // If matches criteria (overall match indicator score >= 50%)
    if (score >= 50) {
      const matchId = `m-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      
      const newMatch = {
        id: matchId,
        sourceItemId: newItem.type === "lost" ? newItem.id : candidate.id,
        matchedItemId: newItem.type === "found" ? newItem.id : candidate.id,
        overallScore: Math.min(100, Math.round(score + 20)), // adjust relative matching boost
        breakdown: {
          description: descScore || 50,
          location: locationScore,
          date: dateScore,
          category: categoryScore,
        },
        blurb: newItem.type === "lost" 
          ? `Found matching "${candidate.name}" turned in at ${candidate.location}! 🔍`
          : `Match alert! Fits description of "${candidate.name}" lost near ${candidate.location}! 👀`,
      };

      db.matches.unshift(newMatch);

      // Add Notification
      const notificationId = `n-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      db.notifications.unshift({
        id: notificationId,
        message: `New match alert: "${newItem.name}" is a ${newMatch.overallScore}% match!`,
        icon: "match",
        timeAgo: "Just now",
        unread: true,
      });

      // Add Activity
      const activityId = `a-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      db.activities.unshift({
        id: activityId,
        message: `Match alert! "${newItem.name}" matches an reported item.`,
        timeAgo: "Just now",
        icon: "match",
      });
    }
  });
}

// Routes
app.get("/api/items", (req, res) => {
  const db = readDB();
  res.json(db.items);
});

app.get("/api/items/:id", (req, res) => {
  const db = readDB();
  const item = db.items.find((item) => item.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

app.post("/api/items", (req, res) => {
  const db = readDB();
  const newItemData = req.body;
  
  if (!newItemData.name || !newItemData.category || !newItemData.type || !newItemData.location || !newItemData.date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newId = (db.items.reduce((max, item) => Math.max(max, parseInt(item.id) || 0), 0) + 1).toString();
  
  const newItem = {
    id: newId,
    name: newItemData.name,
    category: newItemData.category,
    type: newItemData.type,
    description: newItemData.description || "",
    image: newItemData.image || `https://picsum.photos/seed/${encodeURIComponent(newItemData.name)}/600/450`,
    location: newItemData.location,
    date: newItemData.date,
    time: newItemData.time || "",
    color: newItemData.color || "",
    brand: newItemData.brand || "",
    additionalDetails: newItemData.additionalDetails || "",
    keepingLocation: newItemData.keepingLocation || "",
    status: "active",
    reportedBy: "You",
  };

  db.items.unshift(newItem);

  // Add activity entry
  db.activities.unshift({
    id: `a-${Date.now()}`,
    message: `You reported ${newItem.type === "lost" ? "losing" : "finding"} "${newItem.name}".`,
    timeAgo: "Just now",
    icon: newItem.type,
  });

  // Run matching check
  runMatching(newItem, db);

  writeDB(db);
  res.status(201).json(newItem);
});

app.post("/api/items/:id/claim", (req, res) => {
  const db = readDB();
  const itemIndex = db.items.findIndex((item) => item.id === req.params.id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  const item = db.items[itemIndex];
  item.status = "returned";

  // Create notifications and activity
  db.notifications.unshift({
    id: `n-${Date.now()}`,
    message: `Claim resolved: "${item.name}" has been marked as returned! 🎉`,
    icon: "success",
    timeAgo: "Just now",
    unread: true,
  });

  db.activities.unshift({
    id: `a-${Date.now()}`,
    message: `Item "${item.name}" was marked as returned.`,
    timeAgo: "Just now",
    icon: "returned",
  });

  writeDB(db);
  res.json(item);
});

app.get("/api/stats", (req, res) => {
  const db = readDB();
  const activeItems = db.items;
  
  // Calculate dynamic stats relative to base values to match Phase 1 visual appearance
  const reportedCount = activeItems.filter((i) => i.type === "lost").length + 130;
  const foundCount = activeItems.filter((i) => i.type === "found").length + 80;
  const returnedCount = activeItems.filter((i) => i.status === "returned").length + 72;
  const matchesCount = db.matches.length + 48;

  res.json({
    reported: reportedCount,
    found: foundCount,
    returned: returnedCount,
    matches: matchesCount,
  });
});

app.get("/api/matches", (req, res) => {
  const db = readDB();
  res.json(db.matches);
});

app.get("/api/notifications", (req, res) => {
  const db = readDB();
  res.json(db.notifications);
});

app.post("/api/notifications/mark-read", (req, res) => {
  const db = readDB();
  db.notifications.forEach((n) => {
    n.unread = false;
  });
  writeDB(db);
  res.json({ success: true });
});

app.get("/api/activities", (req, res) => {
  const db = readDB();
  res.json(db.activities);
});

// Central Dashboard Endpoint to retrieve all data in a single round-trip
app.get("/api/dashboard", (req, res) => {
  const db = readDB();
  const activeItems = db.items;
  
  // Filter for dashboard-specific lists
  const myLostItems = activeItems.filter((i) => i.type === "lost" && i.status !== "returned").slice(0, 3);
  const myFoundItems = activeItems.filter((i) => i.type === "found" && i.status !== "returned").slice(0, 3);
  const returnedCount = activeItems.filter((i) => i.status === "returned").length;

  const reportedCount = activeItems.filter((i) => i.type === "lost").length + 130;
  const foundCount = activeItems.filter((i) => i.type === "found").length + 80;
  const returnedTotalCount = returnedCount + 72;
  const matchesCount = db.matches.length + 48;

  res.json({
    myLostItems,
    myFoundItems,
    returnedCount: returnedCount, // count of user returned items in this session
    stats: {
      reported: reportedCount,
      found: foundCount,
      returned: returnedTotalCount,
      matches: matchesCount,
    },
    matches: db.matches.slice(0, 3),
    activities: db.activities.slice(0, 6),
  });
});

app.listen(PORT, () => {
  console.log(`Campus Find backend listening at http://localhost:${PORT}`);
});
