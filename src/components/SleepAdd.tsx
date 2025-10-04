import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "./Alert";
import { sleepApi } from "../app/api";
import { isDayTime } from "../app/helper";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

const SleepAdd: React.FC = () => {
  const [start_time, setStartTime] = useState("2025-10-01 08:20:00");
  const [end_time, setEndTime] = useState("2025-10-01 09:00:00");
  const [type, setType] = useState("nap");
  const [note, setNote] = useState("a good nap");
  // const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info">("info");
  const dispatch = useDispatch();

  const dateFormat = "dd / MM / yyyy \'at\' HH:mm";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      sleepApi.addEntry({
        start_time,
        end_time,
        type,
        note,
      }).then((response) => {
        console.log("Added entry response:", response);
        dispatch({ type: "sleep/addEntry", payload: response });
        setAlertType("success");
        setAlertMessage("Sleep entry added successfully.");
        setStartTime("");
        setEndTime("");
        setType("night");
        setNote("");
      });
    } catch (error: any) {
      setAlertType("error");
      setAlertMessage("Failed to add sleep entry.");
      console.error("Error adding sleep entry:", error);
    }
  };

  const updateStartTime = (value: string) => {
    setStartTime(value);
    setType(isDayTime(value) ? "nap" : "night");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 max-w-xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold">Add Sleep Entry</h2>

      {alertMessage && (
        <Alert
          type={alertType}
          message={alertMessage}
          className="mt-4"
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="start_time">
            Start Time
          </label>
          <DatePicker
            id="start_time"
            showTimeSelect
            timeFormat="hh:mm a"
            timeIntervals={10}
            dateFormat={dateFormat}
            maxDate={new Date()}
            selected={start_time ? parseISO(start_time) : null}
            onChange={(date) => updateStartTime(date ? date.toISOString() : "")}
            className="w-full border-b-1 py-2 focus:outline-none focus:ring-0 focus:shadow-[0_1px_0_#000]"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="end_time">
            End Time
          </label>
          <DatePicker
            id="end_time"
            showTimeSelect
            timeFormat="hh:mm a"
            timeIntervals={10}
            dateFormat={dateFormat}
            minDate={start_time ? parseISO(start_time) : undefined}
            maxDate={new Date()}
            selected={end_time ? parseISO(end_time) : null}
            onChange={(date) => setEndTime(date ? date.toISOString() : "")}
            className="w-full border-b-1 py-2 focus:outline-none focus:ring-0 focus:shadow-[0_1px_0_#000]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Sleep Type</label>
        <div className="flex items-center gap-3">
          <span>Nap</span>
          <button
            type="button"
            onClick={() => setType(type === "nap" ? "night" : "nap")}
            className={`relative w-14 h-7 rounded-full transition-colors duration-200 cursor-pointer ${type === "nap" ? "bg-yellow-400" : "bg-blue-900"
              }`}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${type === "night" ? "translate-x-7" : ""
                }`}
            />
          </button>
          <span>Night</span>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium" htmlFor="note">
          Note
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border-b-1 py-2 focus:outline-none focus:ring-0 focus:shadow-[0_1px_0_#000]"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Entry
      </button>
    </form>
  );
};

export default SleepAdd;