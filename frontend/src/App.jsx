import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import * as todoService from "./services/todoService";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message || "Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (payload) => {
    try {
      const newTodo = await todoService.createTodo(payload);
      setTodos((p) => [newTodo, ...p]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await todoService.updateTodo(id, updates);
      setTodos((p) => p.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((p) => p.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: "30px auto", padding: 16 }}>
      <h2>Todo App</h2>
      <TodoForm onCreate={handleCreate} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
