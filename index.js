const express = require('express');
const mongoose = require('mongoose');

// Define a schema for your data
const DataSchema = new mongoose.Schema({
  tipo: String,
  estado: String,
});

// Create a model from the schema
const DataModel = mongoose.model('Animal', DataSchema);

// Connect to MongoDB
mongoose.connect('mongodb://nico:password@monguito:27017/myapp?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });

// Create an Express application
const app = express();

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

// Define a route handler for GET requests made to '/getData'
app.get('/', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.send(data);
    console.log("Listando...");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Define a route handler for POST requests made to '/createData'
app.get('/create', async (req, res) => {
  try {
    DataModel.create({tipo: 'chanchito', estado: 'flaco'});
    res.send('ok');
    console.log("CREADO...")
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});
