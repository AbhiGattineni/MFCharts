import { useRef } from "react";

export const Counter = ({ message }) => {
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return (
    <h1>
      Renders: {renderCounter.current}, {message}
    </h1>
  );
};
