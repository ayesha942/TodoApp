import Todo from "../models/todo.js";

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    console.log("🔴 Backend received:", req.body); // Debug log
    
    const { title, dueDate, priority, createdBy } = req.body;

    // ✅ Validate priority value
    const validPriorities = ['Low', 'Medium', 'High'];
    const finalPriority = validPriorities.includes(priority) ? priority : 'Low';
    
    console.log("🔴 Original priority:", priority);
    console.log("🔴 Final priority:", finalPriority);

    const newTodo = new Todo({
      title,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority: finalPriority, // ✅ Use validated priority
      createdBy,
    });

    console.log("🔴 Todo object before save:", {
      title: newTodo.title,
      priority: newTodo.priority,
      dueDate: newTodo.dueDate
    });

    const savedTodo = await newTodo.save();
    
    console.log("🔴 Saved todo priority:", savedTodo.priority);
    
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error("🔴 Error creating todo:", error);
    res.status(500).json({ message: error.message });
  }     
};

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    
    // Debug: Log all priorities
    console.log("🔴 All todos with priorities:", 
      todos.map(t => ({ title: t.title, priority: t.priority }))
    );
    
    res.status(200).json(todos);
  } catch (error){
    console.error("🔴 Error fetching todos:", error);
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
    console.error("🔴 Error fetching todo:", error);
    res.status(500).json({ message: error.message });
  }   
};

// Update todo
export const updateTodo = async (req, res) => {
   try {
    console.log("🔴 Update request:", req.body);
    
    const { title, dueDate, completed, priority } = req.body;
    
    // ✅ Validate priority if provided
    const validPriorities = ['Low', 'Medium', 'High'];
    const updateData = { title, dueDate, completed };
    
    if (priority && validPriorities.includes(priority)) {
      updateData.priority = priority;
    }
    
    console.log("🔴 Update data:", updateData);
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    console.log("🔴 Updated todo priority:", updatedTodo.priority);
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("🔴 Error updating todo:", error);
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
    console.error("🔴 Error deleting todo:", error);
    res.status(500).json({ message: error.message });
  }
};