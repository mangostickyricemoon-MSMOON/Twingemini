import React from "react";

interface TryAgainProps {
  resetGame: () => void;
  startGame: () => void;   // ✅ เพิ่ม
}

const TryAgain: React.FC<TryAgainProps> = ({ resetGame, startGame }) => {
  return (
    <div className="try-again-viewport">
      <button
        className="try-again-btn"
        onClick={() => {
          resetGame();   // ✅ รีเซ็ตเกม
          startGame();   // ✅ เริ่มนับถอยหลังใหม่
        }}
      >
        🚀 Play Again
      </button>
    </div>
  );
};

export default TryAgain;
