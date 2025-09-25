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
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title: title.trim(),dueDate });
    setTitle("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new task"
          className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200"
        />
          {/* Due Date Input */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200"
        />

        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200"
        >
          Add
        </button>
      </div>
    </div>
  );
}