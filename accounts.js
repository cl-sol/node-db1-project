//imports
const express = require("express");
const db = require("./data/dbConfig");
const { insert, where, del } = require("./data/dbConfig");

//route
const router = express.Router();

//CRUD - Create/Insert(post)
router.post("/", async (req, res) => {
    const accountsData = req.body;
    try{
        const account = await db.insert(accountsData).into("accounts")
        if(account) {
            res.status(201).json({
                message: "Account added"
            })
        } else {
            res.status(404).json({
                message: "Error adding account"
            })
        }
    }
    catch{
        res.status(500).json({
            error: "Account could not be added"
        })
    }
})