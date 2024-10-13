const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'www.hacktrent.ca', // or '*'
  credentials: true,
}));

// Connect to PostgreSQL
const pool = new Pool({
  user: 'postgres',  // replace with your PostgreSQL username
  host: 'localhost',
  database: 'hackTrent',
  password: 'postgres',  // replace with your PostgreSQL password
  port: 5432,
});

// JWT Secret
const JWT_SECRET = '12345@6';  // replace with a strong secret

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, JWT_SECRET, { expiresIn: '24h' });
    console.log(token);

    res.json({ token, user: { id: user.rows[0].id, name: user.rows[0].name, role: user.rows[0].role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/profile', async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: user.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/apply', upload.single('resume'), async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  const {
    first_name,
    last_name,
    email,
    age,
    gender,
    pronouns,
    race,
    school,
    major,
    level_of_study,
    country_of_residence,
    question1,
    question2,
    tshirt_size,
    dietary_restrictions,
    agree_conduct,
    share_info,
    receive_emails,
    share_resume
  } = req.body;

  let resume_url = null;
  if (req.file) {
    resume_url = `http://localhost:5001/uploads/${req.file.filename}`;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Insert application into the database
    const newApplication = await pool.query(
      `INSERT INTO applications (
        user_id, first_name, last_name, email, age, gender, pronouns, race, school, major, 
        level_of_study, country_of_residence, question1, question2, tshirt_size, dietary_restrictions, 
        agree_conduct, share_info, receive_emails, resume_url, share_resume
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
      ) RETURNING *`,
      [
        decoded.id, first_name, last_name, email, age, gender, pronouns, race, school, major,
        level_of_study, country_of_residence, question1, question2, tshirt_size, dietary_restrictions,
        agree_conduct, share_info, receive_emails, resume_url, share_resume
      ]
    );

    res.status(201).json({ message: "Application submitted", application: newApplication.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/dashboard', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or token is not properly formatted' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded Token ID:', decoded.id);

    const user = await pool.query('SELECT name FROM users WHERE id = $1', [decoded.id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: user.rows[0] });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    console.error('Error in /dashboard:', err);
    res.status(500).json({ message: 'Failed to load dashboard' });
  }
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service
  auth: {
    user: 'kaushiknag72@outlook.com', // Your email
    pass: 'Omsai@123',  // Your email password
  },
});

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    console.log(`Received password reset request for: ${email}`);

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;

    await pool.query('UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3', [resetToken, resetTokenExpiry, email]);

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    console.log(`Sending reset email to: ${email}`);

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Error in /forgot-password:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Find user by reset token and check expiry
    const user = await pool.query('SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > $2', [token, Date.now()]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    await pool.query('UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE id = $2', [hashedPassword, user.rows[0].id]);

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/submit-application', async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const {
      first_name,
      last_name,
      email,
      age,
      gender,
      pronouns,
      race,
      school,
      major,
      level_of_study,
      country_of_residence,
      question1,
      question2,
      tshirt_size,
      dietary_restrictions,
      agree_conduct,
      share_info,
      receive_emails,
      share_resume
    } = req.body;

    // Insert application into the database
    const newApplication = await pool.query(
      `INSERT INTO applications (
        user_id, first_name, last_name, email, age, gender, pronouns, race, school, major, 
        level_of_study, country_of_residence, question1, question2, tshirt_size, dietary_restrictions, 
        agree_conduct, share_info, receive_emails, share_resume
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
      ) RETURNING *`,
      [
        userId, first_name, last_name, email, age, gender, pronouns, race, school, major,
        level_of_study, country_of_residence, question1, question2, tshirt_size, 
        dietary_restrictions.join(','), agree_conduct, share_info, receive_emails, share_resume
      ]
    );

    res.status(201).json({ message: "Application submitted successfully", application: newApplication.rows[0] });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});