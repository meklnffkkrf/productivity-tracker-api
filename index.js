const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // This API will run on port 3001

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// --- Simple API Endpoints for your Productivity Tracker ---

// In-memory task storage (simulating a database)
let tasks = [
    { id: '1', description: 'Learn Node.js API', completed: false, category: 'Learning' },
    { id: '2', description: 'Build Frontend UI', completed: true, category: 'Development' }
];

// Simple function to "categorize" a task (conceptual AI/ML)
const categorizeTask = (description) => {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes('learn') || lowerDesc.includes('study') || lowerDesc.includes('read')) {
        return 'Learning';
    }
    if (lowerDesc.includes('code') || lowerDesc.includes('build') || lowerDesc.includes('develop')) {
        return 'Development';
    }
    if (lowerDesc.includes('buy') || lowerDesc.includes('shop') || lowerDesc.includes('groceries')) {
        return 'Shopping';
    }
    if (lowerDesc.includes('call') || lowerDesc.includes('email') || lowerDesc.includes('meeting')) {
        return 'Communication';
    }
    return 'General'; // Default category
};

// Example GET endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from your local Express API!' });
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
    console.log('GET /api/tasks called');
    res.json(tasks);
});

// POST a new task (now with conceptual categorization)
app.post('/api/tasks', (req, res) => {
    const description = req.body.description ? req.body.description.trim() : '';
    if (!description) {
        return res.status(400).json({ error: 'Task description is required' });
    }

    const category = categorizeTask(description); // Categorize the task!

    const newTask = {
        id: String(tasks.length + 1), // Simple ID generation
        description: description,
        completed: false,
        category: category // Add the category
    };
    tasks.push(newTask);
    console.log('POST /api/tasks called, new task:', newTask);
    res.status(201).json(newTask); // 201 Created
});

// Start the server
app.listen(port, () => {
  console.log(`Local API server listening at http://localhost:${port}`);
  console.log(`Test it: http://localhost:${port}/api/hello`);
  console.log(`Test tasks: http://localhost:${port}/api/tasks`);
});