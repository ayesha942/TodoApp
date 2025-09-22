import axios from 'axios';
const API_URL = 'http://localhost:3000/api/todos/';
// Create a new todo
export const createTodo = async (todoData) => {
  const response = await axios.post(API_URL, todoData);
  return response.data;
}
// Get all todos
export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}
// Get a todo by ID
export const getTodoById = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
}   
// Update a todo
export const updateTodo = async (id, todoData) => {
  const response = await axios.put(`${API_URL}${id}`, todoData);
  return response.data;
}
// Delete a todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}${id}`);
  return response.data;
}
