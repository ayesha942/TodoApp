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

import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos = [], onUpdate, onDelete }) {
  // Group todos by date
  const groupedTodos = todos.reduce((groups, todo) => {
    const date = todo.date || new Date().toLocaleDateString('en-GB');
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
        <div className="text-gray-500 text-sm">Add your first task above to get started!</div>
      </div>
    );
  }

  return (
    <div>
      {Object.entries(groupedTodos).map(([date, todosForDate]) => (
        <div key={date} className="mb-6">
          {/* Date Header */}
          <div className="mb-3">
            <span className="inline-block text-red-500 font-medium text-sm">
              Date: {date}
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