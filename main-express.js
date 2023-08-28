const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const todos = [];

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(todos);
});

app.post('/', (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.setHeader('Content-Type', 'application/json');
    res.json(newTodo);
});

app.put('/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    const itemIndex = todos.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        todos[itemIndex] = { ...todos[itemIndex], ...updatedItem };
        res.setHeader('Content-Type', 'application/json');
        res.json(todos[itemIndex]);
    } else {
        res.status(404).send('Item not found');
    }
});

app.delete('/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = todos.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        todos.splice(itemIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Item not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
