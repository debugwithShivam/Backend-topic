import express from 'express'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

dotenv.config()
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let userData = null;

app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <br><br>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br><br>

      <label for="gender">Gender:</label>
      <select id="gender" name="gender" required>
        <option value="">--Select--</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br><br>

      <input type="submit" value="Register">
    </form>
  `);
});

app.post('/submit', (req, res) => {
  userData = req.body; 
  console.log(userData);

  res.send('<h2>Registration Successful!</h2><a href="/user">View User</a>');
});

app.get('/about', (req, res) => {
  res.send('Yeh About Page hai!');
});

app.get('/user', (req, res) => {
  if (!userData) {
    res.send('No user registered yet.');
    return;
  }
  res.send(`
    <h1>User</h1>
    <pre>${JSON.stringify(userData, null, 2)}</pre>
  `);
  console.log(userData)
});

// Route: 404 fallback
app.use((req, res) => {
  res.status(404).send('404 - Page Nahi Mila!');
});

// Start server
app.listen(process.env.PORT, () => {
  console.log('Server chal raha hai port pe!');
});