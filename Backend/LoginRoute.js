const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors());

app.post('/login', (req, res) => {
  // Validate user credentials

  const username = req.body;
  const password = req.body;
  //var secretKey = '9ea6c2ac601acfa563531718e9abd79d2ee1f93c67416f972e347899c3d329b52c73d80e8309b1781baecefd19bab64eb3357c232f6781b4e08ab5a042eb3e16'; 
  // Perform necessary checks, such as querying the database

  // If credentials are valid, generate a JWT
  const token = jwt.sign({ username, password }, '9ea6c2ac601acfa563531718e9abd79d2ee1f93c67416f972e347899c3d329b52c73d80e8309b1781baecefd19bab64eb3357c232f6781b4e08ab5a042eb3e16', { expiresIn: '1h' });

  // Return the JWT as a response
  res.json({ token });

});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});