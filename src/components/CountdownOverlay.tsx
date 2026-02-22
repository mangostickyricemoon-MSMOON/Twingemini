import React from "react";
import "./CountdownOverlay.css";

interface CountdownOverlayProps {
  countdown: number | null;
}

const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ countdown }) => {
  if (countdown === null) return null;

  return (
    <div className="countdown-overlay">
      {countdown > 0 ? (
        <span className="countdown-number">{countdown}</span>
      ) : (
        <span className="countdown-go">GO!</span>
      )}
    </div>
  );
};

export default CountdownOverlay;
