const express = require('express');
const { apiRouter } = require('./routes');
const { connectDB } = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(express.json());

// to get req.cookies
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// mongodb connection
connectDB();

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`server running port: ${port}`);
})

