//imports
const express = require("express");
const db = require("./data/dbConfig");
const { insert, where, del } = require("./data/dbConfig");

//route
const router = express.Router();

// ***/api/accounts***

//CRUD - Create/post
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

//CRUD - Read/get
router.get("/", async (req, res, next) => {
    try{
        const accounts = await db.select("*").from("accounts")
        res.json(accounts)
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res) => {
    try{
        const { id } = await db
            .select("*")
            .from("accounts")
            .where("id", req.params.id)
            .first()

        res.json(id)
    } catch (err){
        next(err);
    }
})

module.exports = router;