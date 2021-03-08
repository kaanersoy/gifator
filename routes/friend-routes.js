const { Database } = require('../db/db');
const friendRouter = require('express').Router();
const db = new Database();


friendRouter.post('/add', async (req,res) => {
    const {from,to} = req.body;
    const friendRequest = {
        from,
        to,
    }
    const response = await db.createFriend(friendRequest);
    res.send(response);
})


module.exports = {friendRouter};