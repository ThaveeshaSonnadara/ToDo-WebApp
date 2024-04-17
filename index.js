const express = require("express");
const app = express();

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const TodoTask = require('./models/TodoTask');

dotenv.config();

app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("public"));

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to the MongoDB database!");
        app.listen(process.env.PORT, () => console.log("Server is up and running on http://localhost:" + process.env.PORT));
    })
    .catch((err) => { console.error(err); })

app.set("view engine", "ejs");


app.get('/', async (req, res) => {
    try {
        const tasksResults = await TodoTask.find({},);
        res.render("home.ejs", { todoTasks: tasksResults, message: null });
    } catch (err) {
        // res.redirect("/");
        // res.status(500).send(err);
        console.error(err);
    }
});

app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });

    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        // res.redirect("/");
        // res.status(500).send(err);
        console.error(err);
    }
});

app.route("/pop-up/:id").get(async (req, res) => {
    const id = req.params.id;
    const deletedTask = await TodoTask.findById(id);
    try {
        res.render("modal.ejs", { DeletedTask: deletedTask });
    } catch (err) {
        // res.redirect("/");
        // res.status(500).send(err);
        console.error(err);
    }
});

app.route("/edit/:id").get(async (req, res) => {
    const id = req.params.id;
    const taskEdits = await TodoTask.find({},);

    try {
        res.render("todoEdit.ejs", { todoTasks: taskEdits, taskId: id })
    } catch (err) {
        // res.redirect("/");
        // res.status(500).send(err);
        console.error(err);
    }
}).post(async (req, res) => {
    const id = req.params.id;
    await TodoTask.findByIdAndUpdate(id, { content: req.body.content });

    try {
        res.redirect("/");
    } catch (err) {
        // res.redirect("/");
        // res.status(500).send(err);
        console.error(err);
    }
});

app.route("/remove/:id").get(async (req, res) => {
    const id = req.params.id;

    try {
        await TodoTask.findByIdAndDelete(id);
        res.redirect("/");
    } catch (err) {
        // res.redirect("/");
        // res.status(500).send(err);
        console.error(err);
    }
});