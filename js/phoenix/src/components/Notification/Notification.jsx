import React from "react";

const ToastNotification = ({ message, type }) => {
  const toastClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed bottom-0 left-0 m-4 p-4 rounded-md text-white font-semibold ${toastClasses[type]}`}
    >
      {message}
    </div>
  );
};

export default ToastNotification;
