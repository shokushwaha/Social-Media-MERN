import React from 'react'
import "./Register.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
export default function Register() {
    const Navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    }
    );

    let HandleEvent = (e) => {

        const { name, value } = e.target

        setUser({ ...user, [name]: value })
    }



    let Register = (event) => {
        event.preventDefault()
        if (user.name && user.username && user.email && user.password) {

            fetch("http://localhost:5000/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then((resp) => {
                resp.json().then((data) => {
                    if (data.message == "User Already Exists") {
                        toast.error(`${data.message}`, {
                            position: 'top-center',
                        })
                    }
                    else {
                        toast.success(`${data.message}`, {
                            position: 'top-center',
                        })
                        Navigate("/login")
                    }
                })
            })

        }
        else {
            event.preventDefault()
        }
    }

    let Login = () => {
        Navigate("/login")
    }



    return (
        <>
            <div classNameName="register-container">

                <h2 style={{ color: "azure", textAlign: "center", padding: "20px", paddingTop: "10px", fontSize: "3rem" }} > Sociallyy</h2>



                <div className="login-box">
                    <form>
                        <div className="user-box">

                            <input type="text" name="name" value={user.name} required onChange={HandleEvent} />
                            <label style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }} >  <AccountCircleIcon style={{ color: "azure" }} /> &nbsp;FullName</label>
                        </div>
                        <div className="user-box">
                            <input type="text" name="username" value={user.username} required onChange={HandleEvent} />
                            <label style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }} > <SentimentVerySatisfiedIcon style={{ color: "azure" }} />&nbsp;UserName</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="password" value={user.password} required onChange={HandleEvent} />
                            <label style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }} > <LockOpenIcon style={{ color: "azure" }} />&nbsp;Password</label>
                        </div>


                        <div className="user-box">
                            <input type="email" name="email" value={user.email} required onChange={HandleEvent} />
                            <label style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }} > <EmailIcon style={{ color: "azure" }} />&nbsp;Email</label>
                        </div>

                        <center>
                            <a onClick={Register}>
                                Register
                                <span></span>
                            </a></center>
                        <center>
                            <a onClick={Login}>
                                Login
                                <span></span>
                            </a></center>
                    </form>
                </div>

            </div>
        </>
    )
}
