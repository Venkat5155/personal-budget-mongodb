const express = require('express');
const { title } = require('process');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

const budget = {
    myBudget: [
    {
        title: 'Eat out',
        budget: 25
    },
    {
        title: 'Rent',
        budget: 375
    },
    {
        title: 'Grocery',
        budget: 110
    },
    ]
};
app.get('/hello', (req,res) => {
    res.send('Hello World1');
});

app.get('/budget', (req, res) => {
    fs.readFile('budget-data.json', 'utf8', (err, data) => {
if (err) {
        res.status(500).send('Error reading budget data');
        return;
}
const budgetData = JSON.parse(data);
res.json(budgetData);
    });
});

// Fetch budget data from server
fetch('/budget').then(response => response.json()).then(data => {
    // Process and visualize the data (using Chart.js or other visualization libraries)
    console.log(data);
    // Assume your existing code to render the chart with Chart.js is here
})
.catch(error => console.error('Error fetching budget data:', error));

app.listen(port, () => {
    console.log('Example app listening at http://localhost: ${port} ');
});