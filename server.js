// require the libs we'll use
const express = require('express');
const cors = require('cors')

// create server
const app = express();
app.use(express.json());
app.use(cors());

let hummuses = [
    { id: 1, flavour: "classic organic", size: "100g" },
    { id: 2, flavour: "red pepper", size: "75g" }
]

// conditional logic for deciphering the request object
app.get('/', (req, res) => {
    res.json({message: 'Hello World!'})
})

app.get('/hummus', (req, res) => {
    res.json({ all: hummuses })
})

app.get('/hummus/:hid', (req, res) => {
    let requestedId = parseInt(req.params.hid)
    let selectedHummus = hummuses.find(h => h.id === requestedId)
    res.json(selectedHummus)
})

app.post('/hummus', (req, res) => {
    let newId = hummuses.length + 1
    let newHummus = { id: newId, ...req.body }
    hummuses.push(newHummus)
    res.status(201).json({ message: `${newHummus.size} ${newHummus.flavour} hummus successfully added`})
})

module.exports = app;