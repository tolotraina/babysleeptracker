import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './../app/store';
import { formatDisplayDateTime, formatDuration } from "../app/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Confirm from "./Confirm";
import { sleepApi } from "../app/api";

const SleepList: React.FC = () => {
  const sleepRecords = useSelector((state: RootState) => state.sleep.entries || []);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editEntry = (id: string) => {
    console.log("Edit entry with id:", id);
    navigate(`/edit-sleep/${id}`);
  }

  const deleteEntry = () => {
    setConfirmOpen(false);
    if (deleteId) {
      sleepApi.deleteEntry(parseInt(deleteId))
        .then(() => {
          dispatch({ type: 'sleep/deleteEntry', payload: deleteId });
          setDeleteId(null);
        });
    }
  }

  const closePopup = () => {
    setDeleteId(null);
    setConfirmOpen(false);
  }

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  }

  return (
    <div className="p-4">
      <h1>Sleep Records</h1>
      <div className="bg-white shadow rounded">
        <div className="grid grid-cols-[2fr_2fr_2fr_1fr_3fr_50px] font-semibold border-b px-4 py-2">
          <div className="flex-1">Start Time</div>
          <div className="flex-1">End Time</div>
          <div className="flex-1">Duration</div>
          <div className="flex-1">Type</div>
          <div className="flex-1">Note</div>
          <div className="w-[50px] flex-1"></div>
        </div>
        {sleepRecords.length === 0 ? (
          <div className="px-4 py-2 text-gray-500">No records found.</div>
        ) : (
          sleepRecords.map((record, idx) => (
            <div
              key={record.id || idx}
              className="grid grid-cols-[2fr_2fr_2fr_1fr_3fr_50px] px-4 py-2 border-b last:border-b-0"
            >
              <div>{formatDisplayDateTime(record.start_time)}</div>
              <div>{formatDisplayDateTime(record.end_time)}</div>
              <div>{formatDuration(record.start_time, record.end_time)}</div>
              <div>{record.type}</div>
              <div>{record.note || '-'}</div>
              <div>
                <button className="text-primary hover:text-secondary cursor-pointer" onClick={() => editEntry(record.id)}><FontAwesomeIcon icon={faEdit} /></button>
                <button className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => confirmDelete(record.id)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            </div>
          ))
        )}
      </div>
      <Confirm
        message="Are you sure you want to delete this entry?"
        onConfirm={deleteEntry}
        onCancel={closePopup}
        open={confirmOpen}
      />
    </div>
  );
};

export default SleepList;