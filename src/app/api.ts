import type { SleepEntry } from "../features/sleep/sleepDatas";

export const sleepApi = {
  getEntries: async (): Promise<SleepEntry[]> => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const response = await fetch(`${api_url}/sleep-entries`);
    if (!response.ok) {
      throw new Error("Failed to fetch sleep entries");
    }
    const responsejson = await response.json();
    return responsejson.data;
  },
  getEntry: async (id: number): Promise<SleepEntry> => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const response = await fetch(`${api_url}/sleep-entries/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch sleep entry");
    }
    const responsejson = await response.json();
    return responsejson.data;
  },
  addEntry: async (entry: Omit<SleepEntry, "id">): Promise<SleepEntry> => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const response = await fetch(`${api_url}/sleep-entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    if (!response.ok) {
      throw new Error("Failed to add sleep entry");
    }
    // return response
    const responsejson = await response.json();
    // console.log("API addEntry response:", responsejson);
    return responsejson.data;
  },
  editEntry: async (entry: SleepEntry): Promise<SleepEntry> => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const response = await fetch(`${api_url}/sleep-entries/${entry.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    if (!response.ok) {
      throw new Error("Failed to update sleep entry");
    }
    const responsejson = await response.json();
    return responsejson.data;
  },
  deleteEntry: async (id: number): Promise<void> => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const response = await fetch(`${api_url}/sleep-entries/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete sleep entry");
    }
  },
};
