import React, { useState } from "react";
import { useDispatch } from "react-redux";
// Import your sleep entry action creator
// import { addSleepEntry } from "../store/sleepSlice"; // Adjust path as needed

const SleepAdd: React.FC = () => {
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [note, setNote] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Dispatch the action to add a sleep entry
        dispatch({
            type: "sleep/addEntry", // Replace with your actual action type or use action creator
            payload: {
                start_time,
                end_time,
                note,
            },
        });
        setStartTime("");
        setEndTime("");
        setNote("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-6 rounded shadow"
        >
            <h2 className="text-2xl font-bold mb-4">Add Sleep Entry</h2>
            <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="start_time">
                    Start Time
                </label>
                <input
                    id="start_time"
                    type="datetime-local"
                    value={start_time}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="end_time">
                    End Time
                </label>
                <input
                    id="end_time"
                    type="datetime-local"
                    value={end_time}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="note">
                    Note
                </label>
                <textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                    rows={3}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Add Entry
            </button>
        </form>
    );
};

export default SleepAdd;