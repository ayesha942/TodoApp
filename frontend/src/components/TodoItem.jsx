// import React from "react";

// export default function TodoItem({ todo, onUpdate, onDelete }) {
//   const toggle = () => onUpdate(todo._id, { completed: !todo.completed });

//   const remove = () => {
//     if (window.confirm("Delete this todo?")) onDelete(todo._id);
//   };

//   return (
//     <li
//       style={{
//         display: "flex",
//         alignItems: "center",
//         padding: 10,
//         borderBottom: "1px solid #eee",
//       }}
//     >
//       <input type="checkbox" checked={!!todo.completed} onChange={toggle} />
//       <div style={{ flex: 1, marginLeft: 12 }}>
//         <div style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.title}</div>
//         {todo.dueDate && <small>Due: {new Date(todo.dueDate).toLocaleDateString()}</small>}
//       </div>
//       <button onClick={remove} style={{ marginLeft: 8 }}>
//         Delete
//       </button>
//     </li>
//   );
// }


import React from "react";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const toggle = () => onUpdate(todo._id, { completed: !todo.completed });

  const remove = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(todo._id);
    }
  };

  return (
    <div className="group bg-gray-700 hover:bg-gray-650 rounded-lg p-4 mb-3 transition-all duration-200 border border-gray-600">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white shadow-lg'
              : 'border-gray-400 hover:border-green-400 hover:bg-green-500/10'
          }`}
        >
          {todo.completed && '✓'}
        </button>
        
        <div className="flex-1 min-w-0">
          <div
            className={`text-lg font-medium transition-all duration-200 ${
              todo.completed
                ? 'text-gray-400 line-through'
                : 'text-white'
            }`}
          >
            {todo.title}
          </div>
          {todo.dueDate && (
            <div className="text-sm text-gray-400 mt-1">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>

        <button
          onClick={remove}
          className="flex-shrink-0 px-3 py-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}