// import React, { useState } from "react";

// export default function TodoForm({ onCreate }) {
//   const [title, setTitle] = useState("");

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;
//     onCreate({ title: title.trim() });
//     setTitle("");
//   };

//   return (
//     <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Add todo..."
//         style={{ padding: 8, width: "70%" }}
//       />
//       <button type="submit" style={{ marginLeft: 8, padding: "8px 12px" }}>
//         Add
//       </button>
//     </form>
//   );
// }

import React, { useState } from "react";

export default function TodoForm({ onCreate }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title: title.trim() });
    setTitle("");
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-lg">+</span>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}