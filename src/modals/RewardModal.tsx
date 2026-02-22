import React, { RefObject } from "react";
import { saveScore } from "../api/leaderboardApi"; // ✅ import ฟังก์ชันบันทึกคะแนน

interface RewardModalProps {
  setShowRewardModal: (show: boolean) => void;
  setShowMascotModal: (show: boolean) => void;
  audioRef: RefObject<HTMLAudioElement>;
  playerName: string;
  gameTime: number; // ✅ เก็บเป็น ms
}

const RewardModal: React.FC<RewardModalProps> = ({
  setShowRewardModal,
  setShowMascotModal,
  audioRef,
  playerName,
  gameTime,
}) => {
  // ✅ format เวลาเป็น mm:ss:cs
  const minutes = Math.floor(gameTime / 60000);
  const seconds = String(Math.floor((gameTime % 60000) / 1000)).padStart(2, "0");
  const centiseconds = String(Math.floor((gameTime % 1000) / 10)).padStart(2, "0");

  return (
    <div className="announcement-modal-overlay">
      <div className="announcement-modal-content">
        <h2 className="announcement-title">🏆 Game Summary</h2>
        <p style={{ marginBottom: "1rem" }}>
          <strong>Player:</strong> {playerName || "Unknown"}
        </p>
        <p style={{ marginBottom: "1.5rem" }}>
          <strong>Time Used:</strong> {minutes}:{seconds}:{centiseconds}
        </p>
        <p style={{ marginBottom: "2rem", color: "#00ffff" }}>
          Your memory is out of this world!
        </p>
        <button
          className="announcement-ok-btn"
          onClick={async () => {
            // ✅ บันทึกคะแนนไป API
            try {
              await saveScore(playerName || "Unknown", gameTime);
              console.log("Score saved successfully!");
            } catch (err) {
              console.error("Failed to save score:", err);
            }

            // ✅ ปิด RewardModal และเปิด MascotModal
            setShowRewardModal(false);
            setShowMascotModal(true);

            // ✅ เล่นเสียง
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(err =>
                console.error("Play failed:", err)
              );
            }
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RewardModal;
