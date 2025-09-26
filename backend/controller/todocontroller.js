import Todo from "../models/todo.js";

// Create a new todo
// controller/todocontroller.js
export const createTodo = async (req, res) => {
  try {
    const { title, dueDate, priority, createdBy } = req.body;  // ✅ priority add

    const newTodo = new Todo({
      title,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority, // ✅ yaha set karo
      createdBy,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }     
};

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(todos);
  } catch (error){
    res.status(500).json({ message: error.message });
  }
};

// Get single todo
export const getTodoById = async (req, res) => {
  try {           
    const todo = await Todo.findById(req.params.id);
    if (!todo){
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }   
};

// Update todo
export const updateTodo = async (req, res) => {
   try {
    const { title, dueDate, completed, priority } = req.body; // ✅ priority add
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, dueDate, completed, priority }, // ✅ priority update allowed
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo){   
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
