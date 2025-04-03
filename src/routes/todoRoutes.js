const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get all todos
router.get('/', todoController.getAllTodos);

// Create a new todo
router.post('/', todoController.createTodo);

// Get a single todo
router.get('/:id', todoController.getTodo);

// Update a todo
router.put('/:id', todoController.updateTodo);

// Delete a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router; 