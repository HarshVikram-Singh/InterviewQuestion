import React, { useState } from "react";
import { CardProps } from "./types";
import { thumbnails } from "./Helper";

const Card: React.FC<CardProps> = ({
  type,
  title,
  position,
  onClick,
  onDragStart,
  onDrop,
  onDragOver,
}) => {
  const [loading, setLoading] = useState(true);

  // setting the image loading
  const handleImageLoad = () => {
    setLoading(false);
  };
  console.log(loading, "laoding");

  return (
    <div
      className="card"
      draggable
      onDragStart={() => onDragStart(position)}
      onDrop={() => onDrop(position)}
      onDragOver={(e) => onDragOver(e)}
      onClick={onClick}
    >
      {loading && <div className="spinner">Loading...</div>}
      <img
        src={thumbnails[type]}
        alt={title}
        onLoad={handleImageLoad}
        style={{ display: loading ? "none" : "block" }}
      />
      {!loading && <p>{title}</p>}
    </div>
  );
};

export default Card;
