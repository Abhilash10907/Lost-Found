export type ItemStatus = "lost" | "found" | "returned";

export type ItemCategory =
  | "Electronics"
  | "ID Cards"
  | "Wallets"
  | "Keys"
  | "Bags"
  | "Books"
  | "Clothing"
  | "Accessories"
  | "Documents"
  | "Other";

export type CampusLocation =
  | "Main Library"
  | "Cafeteria"
  | "Computer Science Block"
  | "Main Gate"
  | "Sports Complex"
  | "Hostel Block A"
  | "Hostel Block B"
  | "Auditorium"
  | "Student Center"
  | "Parking Area";

export interface CampusItem {
  id: string;
  name: string;
  category: ItemCategory;
  type: ItemStatus;
  description: string;
  image: string;
  location: CampusLocation;
  date: string; // ISO date string
  time?: string;
  color?: string;
  brand?: string;
  additionalDetails?: string;
  keepingLocation?: string; // only relevant for found items
  status: "active" | "matched" | "returned";
  reportedBy?: string;
}

export interface MatchBreakdown {
  description: number;
  location: number;
  date: number;
  category: number;
}

export interface ItemMatch {
  id: string;
  sourceItemId: string;
  matchedItemId: string;
  overallScore: number;
  breakdown: MatchBreakdown;
  blurb: string;
}

export interface CampusNotification {
  id: string;
  message: string;
  icon: "match" | "message" | "success" | "info";
  timeAgo: string;
  unread: boolean;
}

export interface ActivityEntry {
  id: string;
  message: string;
  timeAgo: string;
  icon: "lost" | "found" | "match" | "returned";
}
