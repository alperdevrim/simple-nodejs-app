const todoService = require('../services/todoService');

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = todoService.getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const todo = todoService.createTodo({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single todo
exports.getTodo = async (req, res) => {
  try {
    const todo = todoService.getTodo(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = todoService.updateTodo(req.params.id, req.body);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const success = todoService.deleteTodo(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 