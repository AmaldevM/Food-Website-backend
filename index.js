const express = require('express');
const { apiRouter } = require('./routes');
const { connectDB } = require('./config/db');
const cookieParser = require('cookie-parser');
const port = 3000;


const app = express();
app.use(express.json());
app.use(cookieParser())


app.use('/api', apiRouter);

connectDB();

app.listen(port, () => {
    console.log(`server running port: ${port}`);
})

