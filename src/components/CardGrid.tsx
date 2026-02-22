import React from "react";
import Card from "../components/Card";

interface CardGridProps {
  cards: string[];
  flipped: number[];
  matched: number[];
  handleFlip: (index: number) => void;
  mangoIcon: string;
}

const CardGrid: React.FC<CardGridProps> = ({
  cards,
  flipped,
  matched,
  handleFlip,
  mangoIcon,
}) => {
  return (
    <div className="mango-grid">
      {cards.map((card, index) => {
        const isFlipped = flipped.includes(index) || matched.includes(index);
        return (
          <Card
            key={index}
            card={card}
            index={index}
            isFlipped={isFlipped}
            handleFlip={handleFlip}
            mangoIcon={mangoIcon} isMatched={false}          />
        );
      })}
    </div>
  );
};

export default CardGrid;
