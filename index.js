const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const cors = require("cors");


async function main(){
    await mongoose.connect("mongodb://localhost:27017")
}
main().then(console.log("server connected")).catch(err => console.log(err))


app.listen(port, () => {
    console.log(`server running port: ${port}`)
})