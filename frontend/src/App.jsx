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

import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./services/todoService" // adjust the path if needed
import "./App.css";

export default function App() {
  
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Create Todo
  const onCreate = async (newTodo) => {
    try {
      const created = await createTodo({
        ...newTodo,
        completed: false,
        date: new Date().toLocaleDateString("en-GB"), // DD/MM/YYYY
      });
      setTodos((prev) => [created, ...prev]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Update Todo
  const onUpdate = async (id, updates) => {
    try {
      const updated = await updateTodo(id, updates);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updated : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete Todo
  const onDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-800">To Do List</h1>
            <div className="text-2xl">📋</div>
          </div>
        </div>
 <div className="bg-blue-500 text-white p-6 rounded-lg text-xl">
      ✅ Tailwind Fixed and Working!
    </div>
        {/* Main Container */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <TodoForm onCreate={onCreate} />

          {loading ? (
            <p className="text-center text-gray-500">Loading tasks...</p>
          ) : (
            <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
