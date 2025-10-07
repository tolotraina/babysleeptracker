import React from "react";
import SleepListTable from "./SleepListTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt, faList, faTable, faTabletAlt } from "@fortawesome/free-solid-svg-icons";
import SleepListCalendar from "./SleepListCalendar";

const SleepList: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<"table" | "calendar">("table");

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1>Sleep Records</h1>
        {/* <div className="mb-4 flex space-x-4">
          <button onClick={() => setViewMode("table")} aria-label="Table View">
            <FontAwesomeIcon icon={faList} className={viewMode === 'table' ? 'text-primary' : 'text-gray-500'} />
          </button>
          <button onClick={() => setViewMode("calendar")} aria-label="Calendar View">
            <FontAwesomeIcon icon={faCalendarAlt} className={viewMode === 'calendar' ? 'text-primary' : 'text-black'} />
          </button>
        </div> */}
      </div>
      {viewMode === "table" ? (
        <SleepListTable />
      ) : (
        <SleepListCalendar />
      )}
    </div>
  );
};

export default SleepList;