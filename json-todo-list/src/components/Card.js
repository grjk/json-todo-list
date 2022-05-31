import React from "react";

function Card({ data, editTodo, removeTodo }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{data.title}</div>
        <div>Completion: {data.completed ? "Yes" : "No"}</div>
        <button onClick={() => editTodo(data)}>Edit</button>
        <button onClick={() => removeTodo(data.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Card;
