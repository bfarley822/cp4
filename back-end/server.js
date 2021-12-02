const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/cp4', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  height: String,
  weight: String,
  path: String,
});

const workoutSchema = new mongoose.Schema({
  partOfBody: String,
  intensity: String,
  time: String,
  description: String,
  who: String,
  path: String,
});

// Create a model for items in the museum.
const User = mongoose.model('User', userSchema);
const Workout = mongoose.model('Workout', workoutSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    height: req.body.height,
    weight: req.body.weight,
    path: req.body.path,
  });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/workouts', async (req, res) => {
  const workout = new Workout({
    partOfBody: req.body.partOfBody,
    intensity: req.body.intensity,
    time: req.body.time,
    description: req.body.description,
    who: req.body.who,
    path: req.body.path,
  });
  try {
    await workout.save();
    res.send(workout);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/users', async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/workouts', async (req, res) => {
  try {
    let workouts = await Workout.find();
    res.send(workouts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/workouts/:id', async (req, res) => {
  try {
    await Workout.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/users/:id', async (req, res) => {
  let user = await User.findOne({
    _id: req.params.id
  });
  user.name = req.body.name,
  user.height = req.body.height,
  user.weight = req.body.weight
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/workouts/:id', async (req, res) => {
  let workout = await Workout.findOne({
    _id: req.params.id
  });
  workout.partOfBody = req.body.partOfBody,
  workout.intensity = req.body.intensity,
  workout.time = req.body.time,
  workout.description = req.body.description,
  workout.who = req.body.who
  try {
    await workout.save();
    res.send(workout);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
