const express = require('express');
const { resolve } = require('path');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = 3010;
app.use(express.json());

app.use("/api", userRoute);

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Example app listening at http://localhost:${port}`);
});
