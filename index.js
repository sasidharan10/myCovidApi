require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
    // Set the Access-Control-Allow-Origin header to allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Set the Access-Control-Allow-Methods header to allow the desired HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Set the Access-Control-Allow-Headers header to allow the desired headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Pass the control to the next middleware
    next();
});

const user_name = process.env.MONGO_USERNAME;
const ps_word = process.env.MONGO_PS;

mongoose.connect(`mongodb+srv://${user_name}:${ps_word}@clouddatabase.xen9i.mongodb.net/covid19DB`);

const collectionName = 'covid';

const covidModel = mongoose.model(collectionName, new mongoose.Schema({}), collectionName);

app.get("/", (req, res) => {
    covidModel.find({}).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        res.send(err);
    });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("http://localhost:5000/");
});