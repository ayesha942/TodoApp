import React, { useState } from "react";

export default function TodoForm({ onCreate }) {
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title: title.trim() });
    setTitle("");
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add todo..."
        style={{ padding: 8, width: "70%" }}
      />
      <button type="submit" style={{ marginLeft: 8, padding: "8px 12px" }}>
        Add
      </button>
    </form>
  );
}
