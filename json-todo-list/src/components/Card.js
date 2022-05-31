import React from "react";

function Card({ data }) {
  return (
    <div className="card">
      <div className="card-body">
        <p className="card-title">{data.title}</p>
        <p className="card-body">Completion: {data.completed ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default Card;
