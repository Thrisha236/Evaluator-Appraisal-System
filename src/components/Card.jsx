import React from "react";

function Card({ title, value, iconEmoji, colorClass }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${colorClass}`}>{iconEmoji}</div>
      <div className="stat-info">
        <div className="stat-number">{value}</div>
        <div className="stat-label">{title}</div>
      </div>
    </div>
  );
}

export default Card;