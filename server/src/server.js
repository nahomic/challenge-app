require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwbtoken");
const bodyParser = require('body-parser');
const cors = require('cors');
const { User } = require("./models");
const { Database } = require('./config/database');

const salt = 10;

const port = process.env.PORT || 3001;
const secrect = process.env.SECRET || "shhh";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

function start() {
    console.log("Server on port", port);
    const db = new Database();
    db.testConnection();
}

app.post("/users", async (req, res, next) => {
    try{
        let { password, email, name } = req.body;
        const userExists = await User.findOne({
            where: {email: email},
        });

        if (userExists) {
            res.status(400).json({ message: "User already exists" });
        }
        
        password = await bcrypt.hash(password, salt);
        const user = await User.create({
            balance: 0,
            password,
            email,
            name,
        });
        
        res.status(201).json({ user });
    }catch(e){
        res.status(500).json({
            error: e,
        });
    }
});

app.post('/auth/login', async(req, res, next) => {
    try{
        const { password, email } = req.body;
        
        const user = await User.findOne({
            where: { email },
        });
        
        if (!user) {
            res.status(400).json({ message: "User no exist"});
        }
        
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.status(401).json({ message: "Unauthorized" });
        }
        
        const token = jwt.sign({user}, secrect);

        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
});

app.listen(port, () => start());