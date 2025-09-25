// import React, { useEffect, useState } from "react";
// import TodoForm from "./components/TodoForm";
// import TodoList from "./components/TodoList";
// import * as todoService from "./services/todoService";

// export default function App() {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchTodos = async () => {
//     try {
//       setLoading(true);
//       const data = await todoService.getTodos();
//       setTodos(data);
//     } catch (err) {
//       setError(err.message || "Failed to load todos");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const handleCreate = async (payload) => {
//     try {
//       const newTodo = await todoService.createTodo(payload);
//       setTodos((p) => [newTodo, ...p]);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleUpdate = async (id, updates) => {
//     try {
//       const updated = await todoService.updateTodo(id, updates);
//       setTodos((p) => p.map((t) => (t._id === id ? updated : t)));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await todoService.deleteTodo(id);
//       setTodos((p) => p.filter((t) => t._id !== id));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 760, margin: "30px auto", padding: 16 }}>
//       <h2>Todo App</h2>
//       <TodoForm onCreate={handleCreate} />
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
//       )}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }

import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);

  const onCreate = (newTodo) => {
    const todo = {
      ...newTodo,
      _id: Date.now().toString(),
      completed: false,
    };
    setTodos(prev => [todo, ...prev]);
  };

  const onUpdate = (id, updates) => {
    setTodos(prev =>
      prev.map(todo =>
        todo._id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const onDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Todo App
          </h1>
          <p className="text-gray-400 text-lg italic">
            Turning tasks into achievements
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
          <TodoForm onCreate={onCreate} />
          <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Stay productive, stay focused ✨
        </div>
      </div>
    </div>
  );
}