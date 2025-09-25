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

  return (
    <div className="flex items-center gap-3 py-2 px-3 bg-gray-50 rounded-lg mb-2 group hover:bg-gray-100 transition-all duration-200">
      <button
        onClick={toggle}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
          todo.completed
            ? "bg-red-400 border-red-400 text-white"
            : "border-gray-300 hover:border-red-300"
        }`}
      >
        {todo.completed && <span className="text-xs">✓</span>}
      </button>

      <div className="flex-1 min-w-0">
        <div
          className={`font-medium transition-all duration-200 ${
            todo.completed ? "text-gray-400 line-through" : "text-gray-700"
          }`}
        >
          {todo.title}
        </div>

        {todo.dueDate && (
          <div
            className={`text-xs ${
              isOverdue ? "text-red-500 font-semibold" : "text-gray-400"
            }`}
          >
            Due: {new Date(todo.dueDate).toLocaleDateString("en-GB")}
          </div>
        )}
      </div>

      <button
        onClick={remove}
        className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
