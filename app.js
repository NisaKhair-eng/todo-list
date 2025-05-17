const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let todos = [];

// Show home page
app.get("/", (req, res) => {
    res.render("index", { todos });
});

// Add a new task
app.post("/add", (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.todo
    };
    todos.push(newTodo);
    res.redirect("/");
});

// Delete a task
app.post("/delete/:id", (req, res) => {
    todos = todos.filter(todo => todo.id != req.params.id);
    res.redirect("/");
});

// Update a task
app.post("/update/:id", (req, res) => {
    const updatedText = req.body.updatedTodo;
    todos = todos.map(todo =>
        todo.id == req.params.id ? { ...todo, text: updatedText } : todo
    );
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
