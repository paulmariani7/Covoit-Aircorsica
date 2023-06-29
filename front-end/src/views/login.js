import React from 'react'
import "./login.css"

export default function login() {
    const login = ()=>{
        try{
        const email = document.querySelector("#email").value
        const password = document.querySelector("#pass").value
        fetch("http://localhost:3001/login", {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({email,password})
        }).then(async response=>{
            if(response.ok){
            const res = await response.json()
                sessionStorage.setItem("token",res.token)
                sessionStorage.setItem("email",res.email)
                window.open("/home","_self")
            }else
            {alert("Wrong UserName or Password")}
        })
        }catch(err) {console.log(err)}
    }
    const register = ()=>{
        try{
        const email = document.querySelector("#email").value
        const password = document.querySelector("#pass").value
        fetch("http://localhost:3001/register", {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({email,password})
        }).then(async response=>{
            if(response.ok){
            const res = await response.json()
                sessionStorage.setItem("token",res.token)
                sessionStorage.setItem("email",res.email)
                alert("Congratulation you are Registred")
                window.open("/home","_self")
            }
        })
        }catch(err) {console.log(err)}
    }
    return (<>
                <div className="sidenav">
                    <div className="login-main-text">
                        <h2>CHAT</h2>
                        <p>Login or register from here to access.</p>
                    </div>
                </div>
                <div className="main">
                    <div className="col-md-6 col-sm-12">
                        <div className="login-form">
                            <form>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" id="email" className="form-control form-control-bis" placeholder="User Name"/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" id="pass" className="form-control form-control-bis" placeholder="Password"/>
                                </div>
                                <div className="button-position">
                                <button type="button" onClick={login}className="btn btn-black">Login</button>
                                <button type="button" onClick={register}className="btn btn-secondary">Register</button>                               
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>)
    
}