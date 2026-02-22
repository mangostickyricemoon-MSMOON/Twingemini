import React, { useState, RefObject } from "react";

interface AnnouncementModalProps {
  setShowAnnouncement: (show: boolean) => void;
  setPlayerName: (name: string) => void;
  audioRef: RefObject<HTMLAudioElement>;
  setIsMuted: (muted: boolean) => void;
  playClickSound: () => void;
  playHoverSound: () => void;
  startGame: () => void;
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  setShowAnnouncement,
  setPlayerName,
  audioRef,
  setIsMuted,
  playClickSound,
  playHoverSound,
  startGame,
}) => {
  const [name, setName] = useState("");

  const handleOk = () => {
    if (name.trim().length > 0) {
      setPlayerName(name.trim().slice(0, 12));
      setShowAnnouncement(false);

      if (audioRef.current) {
        audioRef.current.muted = false;
        setIsMuted(false);
        audioRef.current.play().catch(err =>
          console.error("Background play failed:", err)
        );
      }

      if (!audioRef.current?.muted) {
        playClickSound();
      }

      startGame();
    }
  };

  return (
    <div className="announcement-modal-overlay">
      <div
        className="announcement-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="announcement-title">🎮 Enter Player Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={12}
          placeholder="Your name (max 12 chars)"
          className="announcement-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleOk(); // ✅ กด Enter ที่ input ก็เริ่มเกมได้
            }
          }}
        />
        <button
          className="announcement-ok-btn"
          onClick={handleOk}
          onMouseEnter={() => {
            if (!audioRef.current?.muted) playHoverSound();
          }}
          onTouchStart={() => {
            if (!audioRef.current?.muted) playHoverSound();
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default AnnouncementModal;
