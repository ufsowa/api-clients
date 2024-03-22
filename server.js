const express = require('express');
const cors = require('cors');
const shortid = require('shortid');

// apps
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// database
const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];

// endpoints
app.get('/testimonials', (req, res) => {
    console.log('get all');
    res.json(db);
});

app.get('/testimonials/random', (req, res) => {
    console.log('get random ');
    res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
    console.log('get id ');
    res.json(db.find(item => item.id.toString() === req.params.id));
});

app.put('/testimonials', (req, res) => {
    console.log('put item ');
    db.push({id: shortid(), author: req.body.author, text: req.body.text});
    res.json(db);
});

app.put('/testimonials/:id', (req, res) => {
    console.log('edit item ');
    const index = db.findIndex(item => item.id.toString() === req.params.id);
    db[index] = { ...db[index], author: req.body.author, text: req.body.text};
    res.json(db);
});

app.delete('/testimonials/:id', (req, res) => {
    console.log('delete item ');
    res.json(db.filter(item => item.id.toString() !== req.params.id));
});


// ports
app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});