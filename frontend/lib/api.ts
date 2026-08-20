import { CampusItem, ItemMatch, CampusNotification, ActivityEntry } from "../data/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export interface DashboardData {
  myLostItems: CampusItem[];
  myFoundItems: CampusItem[];
  returnedCount: number;
  stats: {
    reported: number;
    found: number;
    returned: number;
    matches: number;
  };
  matches: ItemMatch[];
  activities: ActivityEntry[];
}

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || `API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getItems(): Promise<CampusItem[]> {
  return fetchApi<CampusItem[]>("/items");
}

export async function getItemById(id: string): Promise<CampusItem> {
  return fetchApi<CampusItem>(`/items/${id}`);
}

export async function createItem(item: Omit<CampusItem, "id" | "status" | "reportedBy" | "image"> & { image?: string | null }): Promise<CampusItem> {
  return fetchApi<CampusItem>("/items", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export async function claimItem(id: string): Promise<CampusItem> {
  return fetchApi<CampusItem>(`/items/${id}/claim`, {
    method: "POST",
  });
}

export async function getStats(): Promise<{ reported: number; found: number; returned: number; matches: number }> {
  return fetchApi<{ reported: number; found: number; returned: number; matches: number }>("/stats");
}

export async function getMatches(): Promise<ItemMatch[]> {
  return fetchApi<ItemMatch[]>("/matches");
}

export async function getNotifications(): Promise<CampusNotification[]> {
  return fetchApi<CampusNotification[]>("/notifications");
}

export async function markNotificationsAsRead(): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>("/notifications/mark-read", {
    method: "POST",
  });
}

export async function getActivities(): Promise<ActivityEntry[]> {
  return fetchApi<ActivityEntry[]>("/activities");
}

export async function getDashboardData(): Promise<DashboardData> {
  return fetchApi<DashboardData>("/dashboard");
}
