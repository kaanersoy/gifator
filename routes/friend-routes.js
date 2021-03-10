const { ObjectId } = require('bson');
const { Database } = require('../db/db');
const {verifyToken} = require('./middlewares')
const friendRouter = require('express').Router();
const db = new Database();


friendRouter.post('/add', verifyToken, async (req,res) => {
  const {toos} = req.body;
  if(req.user.id){
    const friendRequest = {
      from: new ObjectId(req.user.id),
      to: toos,
    }
    const response = await db.createFriend(friendRequest);
    return res.status(200).send(response);
  }
  res.status(400).send({
    error: 'bad request'
  })
})

friendRouter.get('/me', verifyToken, async (req,res) => {
  if(!req.user){
    return res.status(401).send({error: 'You are not authorized'})
  }
  const response = await db.getFriends(req.user.id)
  res.status(200).send(response)
})

friendRouter.get('/sended', verifyToken, async (req,res) => {
  if(!req.user){
    return res.status(401).send({error: 'You are not authorized'})
  }
  const response = await db.getSendedRequests(req.user.id)
  res.status(200).send(response)
})

friendRouter.get('/recieved', verifyToken, async (req,res) => {
  if(!req.user){
    return res.status(401).send({error: 'You are not authorized'})
  }
  const response = await db.getRecievedFriendRequest(req.user.id)
  res.status(200).send(response)
})


module.exports = {friendRouter};