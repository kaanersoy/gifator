// Requirements
const express = require('express');
const helmet = require('helmet');
const { router } = require('./routes/router');
const { friendRouter } = require('./routes/friend-routes');
const cors = require('cors');
//App configuration
const app = express();
require('dotenv').config();

// Middlewares
app.use(
  cors({
    "origin": 'http://localhost:8080',
  })
);
app.use(express.static('public/dist'));
app.use(require('body-parser').json());
app.use('/auth/', router);
app.use('/api/friends/', friendRouter);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);


//Process env destructure
const { PORT } = process.env;

const http = require('http').createServer(app);
const io = require('socket.io')(http,{
  cors: {
    origin: "http://localhost:8080",
    credentials: true
  },
  path: '/socket',
  allowEIO3: true
});

io.on('connection', (socket)=>{
  console.log("user connected ")
  socket.on('message', function(msg){
    io.emit('customEmit', {message: 'yey'})
    console.log('message arrived ', msg)
  })
})

http.listen(PORT, () => {
  console.log(`Server up and running! -> http://localhost:${PORT}`);
});
