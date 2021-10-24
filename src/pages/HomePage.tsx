import React, { FormEvent, useRef, useState } from "react";
import ViewTable from "../components/ViewTable";
import { getTotalView, getUniqueView } from "../log-parser";

const HomePage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [logData, setLogData] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("No file given.");
      return;
    }

    if (file?.name?.split(".")?.[1] !== "log") {
      setError("Incorrect file extension");
      return;
    }

    const result = await file.text();
    setLogData(result);
    setFileName(file?.name);
  };

  return (
    <div className={"container"}>
      <h2>Log Parser</h2>
      <div className={"mb-16"}>
        <form aria-label={"log-file-form"} onChange={handleSubmit}>
          <div className={"file-input-wrapper"}>
            <input
              id="file-upload-input"
              ref={fileRef}
              type={"file"}
              accept=".log"
            />
            <label
              aria-label={"file-upload-input"}
              htmlFor="file-upload-input"
              className="file-upload-button"
            >
              Choose Log File
            </label>
            {fileName && <span className="file-upload-name">{fileName}</span>}
          </div>
        </form>
      </div>
      {error && <div>{error}</div>}
      {logData !== "" && (
        <div>
          <ViewTable
            className={"mb-16"}
            title={"Total View"}
            data={getTotalView(logData)}
          />
          <ViewTable title={"Unique View"} data={getUniqueView(logData)} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
