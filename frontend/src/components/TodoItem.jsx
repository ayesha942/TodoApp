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


// TodoItem.jsx
import React from "react";
import { Trash2 } from "lucide-react";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const toggle = () => onUpdate(todo._id, { completed: !todo.completed });

  const remove = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(todo._id);
    }
  };

  const isOverdue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  // 🎯 Priority color map
  const priorityColors = {
    High: "bg-red-100 text-red-600 border border-red-300",
    Medium: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    Low: "bg-green-100 text-green-600 border border-green-300",
  };

  return (
    <div className="flex items-center gap-4 py-3 px-4 bg-white rounded-xl shadow-sm mb-3 border border-gray-100 hover:shadow-md transition-all duration-200">
      {/* ✅ Checkbox */}
      <button
        onClick={toggle}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
          todo.completed
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-green-400"
        }`}
      >
        {todo.completed && <span className="text-sm font-bold">✓</span>}
      </button>

      {/* 📌 Title + Due Date */}
      <div className="flex-1 min-w-0">
        <div
          className={`font-medium text-base break-words ${
            todo.completed ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {todo.title}
        </div>

        {todo.dueDate && (
          <div
            className={`text-xs mt-1 ${
              isOverdue ? "text-red-500 font-semibold" : "text-gray-500"
            }`}
          >
            📅 Due: {new Date(todo.dueDate).toLocaleDateString("en-GB")}
          </div>
        )}
      </div>

      {/* 🎨 Priority Tag */}
      {todo.priority && (
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[todo.priority]}`}
        >
          {todo.priority}
        </span>
      )}

      {/* 🗑️ Delete Button */}
      <button
        onClick={remove}
        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-all duration-200"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
