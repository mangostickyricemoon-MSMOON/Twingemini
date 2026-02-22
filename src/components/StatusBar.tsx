import React, { RefObject } from "react";

interface StatusBarProps {
  picksTotal: number;
  picksAvailable: number;
  isMuted: boolean;
  toggleMute: () => void;
  playHoverSound: () => void;
  audioRef: RefObject<HTMLAudioElement>;
  bgMusic: string;
  countdown: number | null;   // ✅ เพิ่ม countdown
  gameTime: number;           // ✅ เพิ่ม gameTime
}

const StatusBar: React.FC<StatusBarProps> = ({
  picksTotal,
  picksAvailable,
  isMuted,
  toggleMute,
  playHoverSound,
  audioRef,
  bgMusic,
  countdown,
  gameTime,
}) => {
  return (
    <div className="status-bar">
      {/* ✅ ซ้าย: Matched + Audio */}
      <div className="status-left">
        <span>Matched : {picksTotal - picksAvailable}/{picksTotal}</span>
        <audio ref={audioRef} src={bgMusic} autoPlay loop muted />
        <button
          onClick={toggleMute}
          onMouseEnter={playHoverSound}
          onTouchStart={playHoverSound}
          className="sound-toggle-btn"
        >
    {/*   {isMuted ? "🔇" : "🔊"}    */}
        </button>
      </div>

      {/* ✅ กลาง: Timer */}
      <div className="status-center">
        {countdown !== null && countdown > 0 ? (
          <span className="timer">Start in {countdown}...</span>
        ) : (
          <span className="timer">
            {Math.floor(gameTime / 60000)}:
            {String(Math.floor((gameTime % 60000) / 1000)).padStart(2, "0")}:
            {String(Math.floor((gameTime % 1000) / 10)).padStart(2, "0")}
          </span>
        )}
      </div>

    </div>
  );
};

export default StatusBar;
