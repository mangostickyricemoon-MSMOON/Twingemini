import React from "react";

interface CardProps {
  card: string;
  index: number;
  isFlipped: boolean;
  isMatched: boolean;   // ✅ เพิ่ม matched check
  handleFlip: (index: number) => void;
  mangoIcon: string;
}

const Card: React.FC<CardProps> = ({
  card,
  index,
  isFlipped,
  isMatched,
  handleFlip,
  mangoIcon,
}) => {
  return (
    <button
      className="mango-btn"
      onClick={() => handleFlip(index)}
      disabled={isMatched}   // ✅ disable เฉพาะไพ่ที่ match แล้ว
    >
      {isFlipped || isMatched ? (
        <img src={card} alt="Card" className="mango-img" />
      ) : (
        <img src={mangoIcon} alt="Mango" className="mango-img" />
      )}
    </button>
  );
};

export default Card;
