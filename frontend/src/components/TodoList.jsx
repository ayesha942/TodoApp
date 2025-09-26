// import React from "react";
// import TodoItem from "./TodoItem";

// export default function TodoList({ todos = [], onUpdate, onDelete }) {
//   if (!todos.length) return <p>No todos yet</p>;
//   return (
//     <ul style={{ listStyle: "none", padding: 0 }}>
//       {todos.map((t) => (
//         <TodoItem key={t._id} todo={t} onUpdate={onUpdate} onDelete={onDelete} />
//       ))}
//     </ul>
//   );
// }
import React, { useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos = [], onUpdate, onDelete }) {
  const [sortBy, setSortBy] = useState("dueDate");

  let sortedTodos = [...todos];

  if (sortBy === "dueDate") {
    sortedTodos.sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (a.dueDate) return -1;
      else if (b.dueDate) return 1;
      return 0;
    });
  } else if (sortBy === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    sortedTodos.sort(
      (a, b) => (priorityOrder[a.priority] || 999) - (priorityOrder[b.priority] || 999)
    );
  } else if (sortBy === "createdAt") {
    sortedTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // ✅ Only group by due date if sorting by due date
  const groupedTodos =
    sortBy === "dueDate"
      ? sortedTodos.reduce((groups, todo) => {
          const date = todo.dueDate
            ? new Date(todo.dueDate).toLocaleDateString("en-GB")
            : "No Due Date";
          if (!groups[date]) groups[date] = [];
          groups[date].push(todo);
          return groups;
        }, {})
      : { All: sortedTodos };

  if (!todos.length) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ color: "#999", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
          No tasks yet
        </div>
        <div style={{ color: "#bbb", fontSize: "0.9rem" }}>
          Add your first task above to get started!
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Sorting Dropdown */}
      <div style={{ marginBottom: "1rem" }}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="createdAt">Sort by Created Time</option>
        </select>
      </div>

      {Object.entries(groupedTodos).map(([date, todosForDate]) => (
        <div key={date} style={{ marginBottom: "1.5rem" }}>
          {sortBy === "dueDate" && (
            <div style={{ marginBottom: "0.5rem", color: "#d32f2f", fontWeight: 500 }}>
              {date}
            </div>
          )}

          <div>
            {todosForDate.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
