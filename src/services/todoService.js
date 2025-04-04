// In-memory storage
let todos = [];
let nextId = 1;

// Get all todos
const getAllTodos = () => {
    return todos.sort((a, b) => b.createdAt - a.createdAt);
};

// Create a new todo
const createTodo = (todoData) => {
    const todo = {
        _id: String(nextId++),
        ...todoData,
        completed: false,
        createdAt: new Date()
    };
    todos.push(todo);
    return todo;
};

// Get a single todo
const getTodo = (id) => {
    return todos.find(todo => todo._id === id);
};

// Update a todo
const updateTodo = (id, updates) => {
    const index = todos.findIndex(todo => todo._id === id);
    if (index === -1) return null;

    todos[index] = {
        ...todos[index],
        ...updates
    };
    return todos[index];
};

// Delete a todo
const deleteTodo = (id) => {
    const index = todos.findIndex(todo => todo._id === id);
    if (index === -1) return false;
    
    todos.splice(index, 1);
    return true;
};

module.exports = {
    getAllTodos,
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo
}; 