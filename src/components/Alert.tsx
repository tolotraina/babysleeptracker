import React, { useState } from "react";

type AlertProps = {
  type: "success" | "error" | "info";
  message: string;
  className?: string;
};

const typeStyles: Record<AlertProps["type"], string> = {
  success: "bg-green-100 border-green-400 text-green-800",
  error: "bg-red-100 border-red-400 text-red-800",
  info: "bg-blue-100 border-blue-400 text-blue-800",
};

export const Alert: React.FC<AlertProps> = ({ type, message, className }) => {
  const [display, setDisplay] = useState(true);

  return (<>
    {display && <div
      className={`border-r-4 pt-6 pb-4 pl-4 pr-8 mb-4 fixed right-5 top-2 ${typeStyles[type]} ${className}`}
      role="alert"
    >
      <button
        type="button"
        className="absolute top-2 right-0 bottom-0 text-2xl px-2"
        onClick={() => {
          setDisplay(false);
        }}
      >
        &times;
      </button>
      <span className="font-medium uppercase">{type}:</span> {message}
    </div>}
  </>)
};