import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "./Alert";
import { sleepApi } from "../app/api";
import { isDayTime } from "../app/helper";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import { type SleepEntry, type SleepType } from "../features/sleep/sleepDatas";

import "react-datepicker/dist/react-datepicker.css";

type FormEditionProps = {
  mode: "add" | "edit";
  initialData?: SleepEntry;
};

const FormEdition: React.FC<FormEditionProps> = ({mode, initialData}) => {
  const [start_time, setStartTime] = useState(initialData?.start_time || "");
  const [end_time, setEndTime] = useState(initialData?.end_time || "");
  const [type, setType] = useState<SleepType>(initialData?.type || "nap");
  const [note, setNote] = useState(initialData?.note || "");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info">("info");
  const dispatch = useDispatch();

  const dateFormat = "dd / MM / yyyy 'at' HH:mm";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form submitted in mode:", mode);

    const entry: SleepEntry = {
      id: initialData?.id || "",
      start_time,
      end_time,
      type,
      note,
    };

    const apiCall = 
    mode === "add"
        ? sleepApi.addEntry(entry)
        : sleepApi.editEntry(entry);

    apiCall
      .then((response) => {
        console.log("API response:", response);
        dispatch({
          type: mode === "add" ? "sleep/addEntry" : "sleep/editEntry",
          payload: response,
        });
        setAlertType("success");
        setAlertMessage(
          mode === "add"
            ? "Sleep entry added successfully."
            : "Sleep entry updated successfully."
        );
        if (mode === "add") {
          setStartTime("");
          setEndTime("");
          setType("night");
          setNote("");
        }
      })
      .catch((error: any) => {
        setAlertType("error");
        setAlertMessage(
          mode === "add"
            ? "Failed to add sleep entry."
            : "Failed to update sleep entry."
        );
        console.error("Error:", error);
      });
  };

  const updateStartTime = (value: string) => {
    setStartTime(value);
    setType(isDayTime(value) ? "nap" : "night");
    if(!end_time) setEndTime(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 max-w-xl mx-auto space-y-6"
    >
      <h1>{mode === "add" ? "Add Sleep Entry" : "Edit Sleep Entry"}</h1>

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
            timeFormat="HH:mm"
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
            timeFormat="HH:mm"
            timeIntervals={10}
            dateFormat={dateFormat}
            minDate={end_time ? parseISO(end_time) : undefined}
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
            className={`relative w-14 h-7 rounded-full transition-colors duration-200 cursor-pointer ${
              type === "nap" ? "bg-nap" : "bg-night"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                type === "night" ? "translate-x-7" : ""
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
        className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
      >
        {mode === "add" ? "Add Entry" : "Update Entry"}
      </button>
    </form>
  );
};

export default FormEdition;