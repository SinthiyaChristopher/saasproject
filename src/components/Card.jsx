import React from "react";
import "./Card.css";

function Card({ title, value, color }) {
  return (
    <div className={`card ${color}`}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

export default Card;  