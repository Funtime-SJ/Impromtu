const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = {
  'user@example.com': {
    password: 'password123',
    name: 'Demo User'
  }
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = users[email];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  return res.json({
    message: 'Login successful.',
    user: {
      email,
      name: user.name
    }
  });
});

app.listen(3000, () => {
  console.log('Login backend running on http://localhost:3000');
});
