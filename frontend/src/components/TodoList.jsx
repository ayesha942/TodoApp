import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos = [], onUpdate, onDelete }) {
  if (!todos.length) return <p>No todos yet</p>;
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((t) => (
        <TodoItem key={t._id} todo={t} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
