const { Database } = require('../db/db');
const {verifyToken} = require('./middlewares')
const friendRouter = require('express').Router();
const db = new Database();


friendRouter.post('/add', verifyToken, async (req,res) => {
  const {toos} = req.body;
  if(req.user.id){
    const friendRequest = {
      from: req.user.id,
      to: toos,
    }
    const response = await db.createFriend(friendRequest);
    return res.send(response).status(200);
  }
  res.send({
    error: 'bad request'
  }).status(400)
})


module.exports = {friendRouter};