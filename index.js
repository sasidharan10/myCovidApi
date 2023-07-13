require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const user_name = process.env.MONGO_USERNAME;
const ps_word = process.env.MONGO_PS;

mongoose.connect(`mongodb+srv://${user_name}:${ps_word}@clouddatabase.xen9i.mongodb.net/covid19DB`);

const collectionName = 'covid';

const covidModel = mongoose.model(collectionName, new mongoose.Schema({}), collectionName);

app.get("/", (req, res) => {
    covidModel.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
});

app.listen(process.env.PORT || 3000, () => {
    // console.log("http://localhost:3000/");
});