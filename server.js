const express = require("express");
const mongoose = require("mongoose");
const Budget = require("./models/Budget");
const fs = require("fs"); // File system module
const path = require("path"); // Path module
const app = express();
const port = 3001; // Change this if port is in use

app.use(express.json()); // Middleware to parse JSON requests
app.use('/', express.static('public')); // Serve static files

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/budgetDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Endpoint to fetch budget data from budget-data.json
app.get("/budget", (req, res) => {
    fs.readFile(path.join(__dirname, 'budget-data.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(JSON.parse(data).myBudget);
    });
});

// Endpoint to add a new budget entry
app.post("/budget", async (req, res) => {
    const { title, budget, color } = req.body;
    const newBudget = new Budget({ title, budget, color });

    try {
        const savedBudget = await newBudget.save();
        res.status(201).json(savedBudget);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
