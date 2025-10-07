import React, { useEffect, useState } from "react";
import { sleepApi } from "../app/api";
import { useParams } from "react-router-dom";
import { type SleepEntry } from "../features/sleep/sleepDatas";
import FormEdition from "./FormEdition";

const SleepEdit: React.FC = () => {
  const { id } = useParams();
  const idInt = Number(id);

  const [entry, setEntry] = useState<SleepEntry>();

  useEffect(() => {
    if (Number.isInteger(idInt)) {
      sleepApi
        .getEntry(idInt)
        .then((data) => {
          setEntry(data);
        })
        .catch((error) => console.error("Error fetching sleep entry:", error));
    }
  }, [idInt]);

  return (
    <>
      {entry && <FormEdition mode="edit" initialData={entry} />}
    </>
  );
};

export default SleepEdit;
