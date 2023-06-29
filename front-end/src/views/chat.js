import React, { Component } from 'react'
import "./style.css"
// import "./main"
import Socket from 'socket.io-client'
import Qs from 'qs'

export default class Chat extends Component{
    constructor(props){
        super(props)
        this.message= []
        this.roomName = "NO ROOM"
        this.user = []
    }
    componentDidMount(){
        if(this.socket) return
        this.socket = Socket('http://localhost:3001')
        // Get username and room from URL
        let { username, room } = Qs.parse(document.location.search, {
            ignoreQueryPrefix: true
        });
       console.log("CHAT")
        // Get room and users
        this.socket.on('roomUsers', ({ room, users }) => {
            this.roomName = room
            this.user = users
            this.forceUpdate()
        });
        
        // Message from server
        this.socket.on('message', message => {
            console.log(message)
            
            Array.isArray(message) ? message.forEach(a=>this.message.push(a)) : this.message.push(message)
            console.log(this.message)
            this.forceUpdate()
        });

        this.socket.on("users",userList =>{
            this.user = userList;
            this.forceUpdate()
        })
        this.socket.on('new-room',room=>{
            window.open(document.location.origin+(room && document.location.pathname+'?username='+username+'&room='+room || ''),!room ? '_self' : undefined)
        })
        this.socket.emit('joinRoom', { username, room })
    }
    componentWillUnmount(){
        this.socket.close()
    }
    render = ()=> (
        <div>
            <div className="chat-container">
      <header className="chat-header">
      <a href="/" className="btn-test"><h1>Welcome</h1></a>
        <a href="/home" className="btn" ><i class="fas fa-external-link-square-alt"></i> Room</a>
        <a href="/" className="btn"><i class="fas fa-sign-out-alt"></i> Log out</a>
        
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3> Room Name:</h3>
          <h2 id="room-name">{this.roomName}</h2>
          <h3><i className="fas fa-users"></i> Users :</h3>
          <ul id="users">{this.user.map(u=><li key={u.id}>{u.username}</li>)}</ul>
        </div>
        <div className="chat-messages">
            {this.message.map((message,i)=> 
                <div key={i} className="message">
                    <p className="meta">
                        {message.sender}<span>{message.timestamps}</span>
                    </p>
                    <p className="text">
                        {message.message}
                    </p>
                </div>)}
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={e=>{
            e.preventDefault()
           
            this.socket.emit("chatMessage",e.target[0].value)
            e.target[0].value = ""
        }}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
          />
          <button className="btn"><i class="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
 </div>
 
    )
}

