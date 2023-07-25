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

app.post('/auth', (req, res) => {

    var code = 547893467;

    if(code == 547893467 ){
      code = 'lnzJe2rnW3fssC2aGuOhkBWmukFGezDlk9yZaLtE0kdC5PZXp20EwVLU9UWibIiSFgNJfvZi8DO7pTghhHHTHkWdbyCvngkmXiY5ZXbsjl0XxnPGlwkVkgVo7kCgbknRN991FMdjeY6SeSf6ImylDy0DXIyfkKYclpvmWrCr2aiYaT0w6pVZAvxj1IDHKnuSMmUOQ4jHdE5qMKpvfepe5o2VDYDixXGMAYGpvNc7TdKyUUK7y3n0qiJ2AE8IGD5RdYKd2W0cpuOHwAeBZ44j1E75joAXoGl8UCaMGzLiZtMgcVvDlbCmLKfZnJEDc5tVTj0waoqYxTzzbXwCSo8QZLH2Aevt2rj';
    }

    res.json({ code });
})

app.listen(4444, () => {
  console.log('Server is running on port 4444');
});