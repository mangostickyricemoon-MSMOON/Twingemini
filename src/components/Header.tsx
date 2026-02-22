import React from "react";

interface HeaderProps {
  logo: string;
  playerName: string; 
  setShowAnnouncement: (show: boolean) => void;
  playHoverSound: () => void;
  setShowLeaderboard: (show: boolean) => void; // ✅ เพิ่ม
}

const Header: React.FC<HeaderProps> = ({
  logo,
  playerName,
  setShowAnnouncement,
  playHoverSound,
  setShowLeaderboard, // ✅ รับเข้ามา
}) => {
  return (
    <header className="header">
      {/* ✅ ส่วนซ้าย: แสดง Leaderboard icon + ชื่อผู้เล่น */}
      <div className="header-left">
        <img 
          src="src/assets/Leaderboard.png" 
          alt="Leaderboard Icon" 
          className="leaderboard-icon"
          onClick={() => setShowLeaderboard(true)} // ✅ เปิด modal
        />
        <h2 className="site-title">{playerName || "Player"}</h2>
      </div>

      {/* ✅ ส่วนกลาง: โลโก้ */}
      <div className="header-center">
        <img
          src={logo}
          alt="TogetherWeMoon logo"
          className="logo"
          loading="lazy"
        />
      </div>
    </header>
  );
};

export default Header;
