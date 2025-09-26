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
  const [sortBy, setSortBy] = useState("dueDate"); // ✅ keep state at top

  // 1️⃣ copy todos so we don’t mutate original
  let sortedTodos = [...todos];

  // 2️⃣ apply sorting
  if (sortBy === "dueDate") {
    sortedTodos.sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (a.dueDate) {
        return -1;
      } else if (b.dueDate) {
        return 1;
      }
      return 0;
    });
  } else if (sortBy === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    sortedTodos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  } else if (sortBy === "createdAt") {
    sortedTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // 3️⃣ group by date AFTER sorting
  const groupedTodos = sortedTodos.reduce((groups, todo) => {
    const date = todo.dueDate
      ? new Date(todo.dueDate).toLocaleDateString("en-GB")
      : "No Due Date";
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {});

  if (!todos.length) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-xl mb-2">No tasks yet</div>
        <div className="text-gray-500 text-sm">
          Add your first task above to get started!
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Sorting Dropdown */}
      <div className="mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="createdAt">Sort by Created Time</option>
        </select>
      </div>

      {Object.entries(groupedTodos).map(([date, todosForDate]) => (
        <div key={date} className="mb-6">
          {/* Date Header */}
          <div className="mb-3">
            <span className="inline-block text-red-500 font-medium text-sm">
              {date}
            </span>
          </div>

          {/* Tasks for this date */}
          <div className="space-y-1">
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
