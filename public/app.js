const API_URL = '/api/todos';

// DOM Elements
const todoForm = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');

// Load todos when page loads
document.addEventListener('DOMContentLoaded', loadTodos);

// Add todo form submission
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const todo = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        dueDate: document.getElementById('dueDate').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });

        if (response.ok) {
            todoForm.reset();
            loadTodos();
        }
    } catch (error) {
        console.error('Error adding todo:', error);
    }
});

// Load all todos
async function loadTodos() {
    try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}

// Display todos in the UI
function displayTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
}

// Create todo element
function createTodoElement(todo) {
    const div = document.createElement('div');
    div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    const dueDate = todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : '';
    
    div.innerHTML = `
        <div class="todo-content">
            <div class="todo-title">${todo.title}</div>
            <div class="todo-description">${todo.description || ''}</div>
            ${dueDate ? `<div class="todo-due-date">Due: ${dueDate}</div>` : ''}
        </div>
        <div class="todo-actions">
            <button class="btn btn-sm btn-complete" onclick="toggleComplete('${todo._id}', ${!todo.completed})">
                ${todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="btn btn-sm btn-delete" onclick="deleteTodo('${todo._id}')">Delete</button>
        </div>
    `;
    
    return div;
}

// Toggle todo completion
async function toggleComplete(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });

        if (response.ok) {
            loadTodos();
        }
    } catch (error) {
        console.error('Error updating todo:', error);
    }
}

// Delete todo
async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadTodos();
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
} 