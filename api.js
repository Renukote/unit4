const express = require("express");
const mongoose = require("mongoose");

const app = express();

// 1. connect to mongoDB
// 2. create a schema to data
// 3. create a model

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/entertainment");
}

const userSchema = new mongoose.Schema({
    movie_name: { type: String, required: true },
    movie_genre: { type: String, required: false },
    budget: { type: Number, required: true },
    production_year: { type: Number, required: true },
},
{
    versionKey: false,
    timestamps: true
});

const User = mongoose.model("movies", userSchema);

app.use(express.json());

// see all movies
app.get("/movies", async (req,res) => {
    try{
        const user = await User.find({}).lean().exec();
        return res.status(201).send(user);
    } 
    catch(e) {
        return res.status(500).send(e);
    }
});


// add a new movie
app.post("/movies", async (req,res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).send(user);
    }
    catch(e) {
        return res.status(500).send(e);
    }
});


// get a single movie
app.get("/movies/:id", async (req,res) => {
    try{
        const user = await User.findById(req.params.id).lean().exec();
        return res.status(201).send(user);
    }
    catch(e) {
        return res.status(500).send(e);
    }
});


// update a movie
app.patch("/movies/:id", async(req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean().exec();
        return res.status(201).send(user);  
    }
    catch(e) {
        return res.status(500).send(e);
    }
});


// delete a movie
app.delete("/movies/:id", async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(204).send(user);
    }
    catch(e) {
        return res.status(500).send(e);
    }
});


app.listen(2000,async () => {
    await connect();
    console.log("Listening on port 2000");
})