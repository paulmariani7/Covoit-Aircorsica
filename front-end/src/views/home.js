import React, { Component } from 'react'
import "./style.css"

class Home extends Component {
    render(){
        return <>
        <div className="join-container">
        <header className="join-header">
            <h1><i class="fas fa-comments"></i> IRC-CHAT</h1>
        </header>
        <main className="join-main">
            <form action="/chat">
                <div className="form-control">
                    <label for="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter username"
                        required
                    />
                </div>
                
                <div className="form-control">
                    <label for="room">Room</label>
                    <input
                        type="text"
                        name="room"
                        id="room"
                        placeholder="Enter room name"
                        required
                    />
                </div>
                <button type="submit" className="btn">Join Chat</button>
                <form action="/">
                    <button type="submit" className="btn">Log out</button>
                </form>
            </form>
        </main>
    </div></>
    }
}

export default Home