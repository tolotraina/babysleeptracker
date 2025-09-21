import type { SleepEntry } from "../features/sleep/sleepDatas";

export const sleepApi = {
    getEntries: async (): Promise<SleepEntry[]> => {
        const api_url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${api_url}/sleep-entries`);
        if (!response.ok) {
            throw new Error('Failed to fetch sleep entries');
        }
        const responsejson = await response.json();
        return responsejson.data;
    }
};
