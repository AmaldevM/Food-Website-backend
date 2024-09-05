const express = require('express');
const { apiRouter } = require('./routes');
const app = express();
const port = 3000;

app.use('/api', apiRouter)

app.listen(port, () => {
    console.log(`server running port: ${port}`);
})

