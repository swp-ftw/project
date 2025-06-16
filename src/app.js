const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.json({ limit: '20mb' }));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const recipesRoutes = require('./routes/recipesRoutes');
app.use('/', recipesRoutes);

// Error
app.use((req, res, next) => {
  res.status(404).render("404");
});

// Middleware 500 (ou autres erreurs)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error");
});

// Start
const PORT = 3055;
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

//MongoDB
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error MongoDB :', err));
