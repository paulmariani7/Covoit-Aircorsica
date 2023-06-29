const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./models/messages');
const moment = require('moment');
const bodyParser = require('body-parser')
const {
  userJoin,
  getCurrentUser,
  updateUser,
  userLeave,
  getRoomUsers,
  getRooms,
  getUserByName
} = require('./users-provider/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {cors: {
  origin: "*",
  methods: ["GET", "POST"]
}}) ;

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.json());
app.use(require('cors')());
//database connection
const connect = require("./dbconnect")
const Chat = require("./models/Chat");



const botName = 'Chat Bot';

const commandes = {
  "/nick" : io => socket => newNickName => {
    if(!newNickName) return true
    let user = getCurrentUser(socket.id)
    if(!user)return true
    user.username = newNickName
    updateUser(user)
    io.to(user.room).emit("users",getRoomUsers(user.room))
    return false
  },
  "/list" : io => socket => rooms => {
    let user = getCurrentUser(socket.id)
    if(!user)return true
    io.to(user.room).emit("message",formatMessage(botName, 'Here is the list of rooms of server : '+getRooms(rooms).join(", ")+" ."))
    return false
  },
  
 "/create": io => socket => channel =>{
  socket.emit('new-room', channel)
  return false
},
 "/delete": io => socket => channel =>{
  io.to(channel).emit("new-room", false)
  return false
 },
"/join" : io => socket => channel=> {
  socket.emit('new-room', channel)
  return false
},
"/quit" : io => socket => () => {
  socket.emit('new-room', false)
  return false
},
 "/users": io => socket =>() => {
    let user = getCurrentUser(socket.id)
    if(!user)return false
    io.to(user.room).emit("message",formatMessage(botName, 'Here is the list of users : '+getRoomUsers(user.room).map(a=>a.username).join(", ")+" ."))
    return false
 },
 "/msg" : io => socket => data => { 
  const [nickname, message] = data.split(" ").reduce(($,_)=>{
    !$.length ? $ = [_,"Private :"] : $[1] += " "+_
    return $
  },[])
  console.log(nickname, message)
  let toUser = getUserByName(nickname)
  let user = getCurrentUser(socket.id)
  if(!toUser || !user) return true
  const msg = formatMessage(user.username,message)
  socket.emit("message",msg)
  socket.to(toUser.id).emit("message",msg)
  return false
 }
}
// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', async ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    const msgs = await Chat.find({ room }).lean() 
    console.log(msgs)
    socket.emit('message', msgs )
    socket.emit('message', formatMessage(botName, 'Welcome to Chat!'));

    // Broadcast when a user connects
    console.log(user.room)
    socket
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`, user.room)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  // commandes 
  socket.on('chatMessage', msg => {
    console.log("CHAT MESSAGE")
    const commande = msg.split(" ")[0]
    let bool = true;
    if(commandes[commande])
      bool = commandes[commande](io)(socket)(msg.replace(/^\/\w+\s*/,""))

    if(!bool) return
    /// Send Message
    const user = getCurrentUser(socket.id);
    if(!user) return
    io.to(user.room).emit('message', formatMessage(user.username, msg, user.room));
     //save chat to the database
      let chatMessage = new Chat({ message: msg, sender: user.username, room: user.room, timestamps: moment().format(' h:mm  a') });

      chatMessage.save();
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`, user.room)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.use("/",require('./route/account-read-controller'))
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
