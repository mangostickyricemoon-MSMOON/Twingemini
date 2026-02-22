import React from "react";

interface GuardModalProps {
  setShowGuardModal: (show: boolean) => void;
  guardMessage?: string;
}

const GuardModal: React.FC<GuardModalProps> = ({
  setShowGuardModal,
  guardMessage,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          minWidth: "300px",
        }}
      >
        <h3></h3>
        <p>{guardMessage}</p>
        <button
          onClick={() => setShowGuardModal(false)}
          style={{
            marginTop: "10px",
            padding: "8px 14px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default GuardModal;
