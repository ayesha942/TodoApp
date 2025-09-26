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
  const [priority, setPriority] = useState("Low"); // default priority

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // send new todo to parent
    onCreate({ 
      title: title.trim(), 
      dueDate, 
      priority 
    });

    // reset
    setTitle("");
    setDueDate("");
    setPriority("Low");
  };

  return (
    <div className="mb-6">
      <div className="flex gap-3">
        {/* Title input */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task"
          className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-700"
        />

        {/* Due date */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-700"
        />

        {/* Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-700"
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        {/* Add button */}
        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
}
