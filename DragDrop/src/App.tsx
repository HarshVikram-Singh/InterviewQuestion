import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import { thumbnails } from "./components/Helper";

const data = [
  { type: "bank draft", title: "Bank Draft", position: 0 },
  { type: "bill-of-lading", title: "Bill of Lading", position: 1 },
  { type: "invoice", title: "Invoice", position: 2 },
  { type: "bank-draft-2", title: "Bank Draft 2", position: 3 },
  { type: "bill-of-lading-2", title: "Bill of Lading 2", position: 4 },
];
const App: React.FC = () => {
  const [cards, setCards] = useState(data);
  const [draggedCardIndex, setDraggedCardIndex] = useState<number | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  /**
   * Handle Event for starting the dargged indexes
   * @param position
   */
  const handleDragStart = (position: number) => {
    setDraggedCardIndex(position);
  };

  /**
   * Darg and drop logic
   * position is the index where the cards are shifted
   * using the splice method to update the array
   * @param position
   */
  const handleDrop = (position: number) => {
    console.log(position);
    if (draggedCardIndex !== null) {
      const updatedCards = [...cards];
      const [draggedCard] = updatedCards.splice(draggedCardIndex, 1);
      // this is the logic where i am inserting at index 1 for the updated values
      updatedCards.splice(position, 0, draggedCard);
      setCards(updatedCards);
      setDraggedCardIndex(null);
      console.log(updatedCards, "updatedvalues");
    }
  };

  /**
   * if the user click on any card then the image will be apperated on
   * the middle of the screen
   * @param type
   */
  const handleCardClick = (type: string) => {
    setModalImage(thumbnails[type]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // handle modal close event
  const handleModalClose = () => {
    setModalImage(null);
  };

  //if the user click on escape button then the modal will be closed
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="container">
      <div className="card-grid">
        {cards.map((card, index) => (
          <Card
            key={card.position}
            id={card.position}
            type={card.type}
            title={card.title}
            position={index}
            onClick={() => handleCardClick(card.type)}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        ))}
      </div>
      {modalImage && (
        <div className="modal" onClick={handleModalClose}>
          <div className="modal-content">
            <img src={modalImage} alt="Modal View" />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
