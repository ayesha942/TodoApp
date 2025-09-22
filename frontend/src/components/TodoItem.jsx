import React from "react";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const toggle = () => onUpdate(todo._id, { completed: !todo.completed });

  const remove = () => {
    if (window.confirm("Delete this todo?")) onDelete(todo._id);
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        padding: 10,
        borderBottom: "1px solid #eee",
      }}
    >
      <input type="checkbox" checked={!!todo.completed} onChange={toggle} />
      <div style={{ flex: 1, marginLeft: 12 }}>
        <div style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.title}</div>
        {todo.dueDate && <small>Due: {new Date(todo.dueDate).toLocaleDateString()}</small>}
      </div>
      <button onClick={remove} style={{ marginLeft: 8 }}>
        Delete
      </button>
    </li>
  );
}
