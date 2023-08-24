import { useState } from "react";
import { Dropdown, FetchAllMf } from "../components";
import { TimelineContainer } from "../containers/TimelineContainer/TimelineContainer";
import ToastNotification from "../components/Notification/Notification";

export default function Timeline() {
  const [navData, setNavData] = useState(null);
  const [toasts, setToasts] = useState([]);

  const handleNavData = (e) => {
    setNavData(e.value);
  };

  const showToast = (message, type) => {
    const newToast = { message, type, id: Date.now() };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== newToast.id)
      );
    }, 3000);
  };

  return (
    <div className="md:mt-3 mt-2 px-4">
      <FetchAllMf setNavData={(e) => handleNavData(e)} isMulti={false} />
      {navData != null ? (
        <TimelineContainer id={navData} showToast={(m, t) => showToast(m, t)} />
      ) : null}
      <div>
        {toasts.map((toast) => (
          <ToastNotification // <- Renamed this
            key={toast.id}
            message={toast.message}
            type={toast.type}
          />
        ))}
      </div>
    </div>
  );
}
