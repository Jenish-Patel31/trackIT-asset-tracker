const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const deviceRoutes = require('./routes/deviceRoutes');
const authenticateToken = require('./middlewares/authMiddleware');


require('dotenv').config();
// const { loadAuthClient } = require('./googleSheetsService')
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/devices', deviceRoutes);


app.get('/api/protected-data', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protected data.` });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB Atlas connected ✅");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.listen(4000, () => {
  console.log('🚀 Server running on : https://trackit-asset-tracker.onrender.com');
});
