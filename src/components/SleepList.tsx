import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './../app/store';
import { formatDisplayDateTime, formatDuration } from "../app/helper";
// import { SleepState, type SleepState } from "./../features/sleep/sleepSlice";

const SleepList: React.FC = () => {
  const sleepRecords = useSelector((state: RootState) => state.sleep.entries || []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sleep Records</h2>
      <div className="bg-white shadow rounded">
        <div className="grid grid-cols-5 font-semibold border-b px-4 py-2">
          <div>Start Time</div>
          <div>End Time</div>
          <div>Duration</div>
          <div>Type</div>
          <div>note</div>
        </div>
        {sleepRecords.length === 0 ? (
          <div className="px-4 py-2 text-gray-500">No records found.</div>
        ) : (
          sleepRecords.map((record, idx) => (
            <div
              key={record.id || idx}
              className="grid grid-cols-5 px-4 py-2 border-b last:border-b-0"
            >
              <div>{formatDisplayDateTime(record.start_time)}</div>
              <div>{formatDisplayDateTime(record.end_time)}</div>
              <div>{formatDuration(record.start_time, record.end_time)}</div>
              <div>{record.type}</div>
              <div>{record.note || '-'}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SleepList;