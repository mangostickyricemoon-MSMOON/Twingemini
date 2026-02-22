import React from "react";

interface FooterProps {
  homeIcon: string;
  howtoIcon: string;
  buyTicket: string;
  itemIcon: string;
  walletIcon: string;
  setShowAdminModal: (show: boolean) => void;
  setShowHowToModal: (show: boolean) => void;
  setShowTicketModal: (show: boolean) => void;
  setShowItemModal: (show: boolean) => void;
  setShowWalletModal: (show: boolean) => void;
  isAdmin: boolean; // ✅ เพิ่ม prop สำหรับตรวจสอบสิทธิ์
}

const Footer: React.FC<FooterProps> = ({
  homeIcon,
  howtoIcon,
  buyTicket,
  itemIcon,
  walletIcon,
  setShowHowToModal,
  setShowTicketModal,
  setShowItemModal,
  setShowWalletModal,
  isAdmin,
}) => {
  return (
    <footer className="footer">
      <button
        className="nav-btn" 
      >
        <img src={homeIcon} alt="Home" className="nav-icon nav-icon-home" />
      </button>

      <button className="nav-btn" onClick={() => setShowHowToModal(true)}>
        <img src={howtoIcon} alt="How To" className="nav-icon nav-icon-howto" />
      </button>
      <button className="nav-btn" onClick={() => setShowTicketModal(true)}>
        <img src={buyTicket} alt="Buy Ticket" className="nav-icon nav-icon-ticket" />
      </button>
      <button className="nav-btn" onClick={() => setShowItemModal(true)}>
        <img src={itemIcon} alt="Item" className="nav-icon nav-icon-item" />
      </button>
      <button className="nav-btn" onClick={() => setShowWalletModal(true)}>
        <img src={walletIcon} alt="Wallet" className="nav-icon nav-icon-wallet" />
      </button>
    </footer>
  );
};

export default Footer;
