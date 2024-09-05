const express = require('express');
const { apiRouter } = require('./routes');
const { connectDB } = require('./config/db')
const app = express();
const port = 3000;

app.use('/api', apiRouter);

connectDB();

app.listen(port, () => {
    console.log(`server running port: ${port}`);
})

