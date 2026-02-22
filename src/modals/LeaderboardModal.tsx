import React, { RefObject, useEffect } from "react";

interface LeaderboardModalProps {
  setShowLeaderboard: (show: boolean) => void;
  setShowTryAgain: (show: boolean) => void;
  leaderboardData: { name: string; time: number; date?: string }[];
  audioRef: RefObject<HTMLAudioElement>;
  playHoverSound: () => void;
  stopGame: () => void;
  resumeGame: () => void; // ✅ เพิ่ม resumeGame
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  setShowLeaderboard,
  setShowTryAgain,
  leaderboardData,
  audioRef,
  playHoverSound,
  stopGame,
  resumeGame,
}) => {
  // ✅ หยุดเวลาเมื่อ modal เปิด
  useEffect(() => {
    stopGame();
  }, [stopGame]);

  const sortedData = [...leaderboardData].sort((a, b) => a.time - b.time);

  return (
    <div className="leaderboard-modal-overlay">
      <div
        className="leaderboard-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="leaderboard-title">🚀 Leaderboard</h2>
        
        <div className="leaderboard-scroll">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Time (mm:ss:cs)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.slice(0, 100).map((entry, index) => {
                const minutes = Math.floor(entry.time / 60000);
                const seconds = String(Math.floor((entry.time % 60000) / 1000)).padStart(2, "0");
                const centiseconds = String(Math.floor((entry.time % 1000) / 10)).padStart(2, "0");

                const formattedDate = entry.date
                  ? new Date(entry.date).toLocaleString()
                  : "-";

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>{minutes}:{seconds}:{centiseconds}</td>
                    <td>{formattedDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="leaderboard-buttons">
          {/* ✅ ปุ่ม Close → Resume เล่นต่อ */}
          <button
            className="leaderboard-close-btn"
            onClick={() => {
              setShowLeaderboard(false); // ปิด leaderboard
              resumeGame();              // ✅ resume timer
            }}
            onMouseEnter={playHoverSound}
            onTouchStart={playHoverSound}
          >
            Close
          </button>

          {/* ✅ ปุ่ม Finished → หยุดเกมและไป Try Again */}
          <button
            className="leaderboard-finish-btn"
            onClick={() => {
              stopGame(); // หยุดเวลา
              setShowLeaderboard(false);
              setShowTryAgain(true);
            }}
            onMouseEnter={playHoverSound}
            onTouchStart={playHoverSound}
          >
            Finished
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;
