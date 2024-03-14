const express = require('express');
const mongoose = require('mongoose');
const user = require('./models/usermodel'); // Import the user model before defining routes

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors());

// Routes
app.get('/', (req, res) => { 
  res.send("Hello Node js111");
});


app.get('/user', async (req, res) => {
    try {
        const users = await user.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get('/user/:id', async (req, res) => { // Fix typo in route parameter name
    try {
        const { id } = req.params;
        const foundUser = await user.findById(id); // Fix typo in method name
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/user', async (req, res) => {
  try {
    const newUser = await user.create(req.body); // Use 'user' instead of 'users'
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await user.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Cannot find User!' });
        }
        const latestUser = await user.findById(id);
        res.status(200).json(latestUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
app.delete("/user/:id", async (req, res) => {
    try {
        const {id}  = req.params;
        const deleteuser = await user.findByIdAndDelete(id);
        if(!deleteuser){
            return res.status(404).json({message:"not found"})
        } 
        res.status(200).json(deleteuser)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.listen(5000, () => {
  console.log('Node API is on port 5000');
});

const encodedPassword = encodeURIComponent('Sourav@07');
const connectionURI = `mongodb+srv://ssysourav2126:${encodedPassword}@crud.60x6v4j.mongodb.net/Node-API?retryWrites=true&w=majority&appName=CRUD`;

mongoose.connect(connectionURI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });
