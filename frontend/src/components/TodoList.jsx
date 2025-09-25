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
  if (!todos.length) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-xl mb-2">No tasks yet</div>
        <div className="text-gray-500 text-sm">Add your first task above to get started!</div>
      </div>
    );
  }

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div>
      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-white">Your Tasks</h2>
          <div className="text-sm text-gray-400">
            {completedCount} of {totalCount} completed
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-400 text-right">
          {completionPercentage}% complete
        </div>
      </div>
      
      {/* Tasks List */}
      <div className="space-y-0">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Success Message */}
      {completedCount > 0 && (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="text-green-400 text-sm font-medium">
            🎉 Great job! You've completed {completedCount} task{completedCount !== 1 ? 's' : ''} today.
          </div>
        </div>
      )}
    </div>
  );
}