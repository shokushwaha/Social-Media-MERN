import React from 'react'
import "./Register.css"
import { Form, useNavigate } from "react-router-dom"
import { useState } from "react"
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

            fetch("/user/register", {
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
            <h2>Sociallyy</h2>

            <form >

                <AccountCircleIcon />
                <input type="text" placeholder="Full Name" name="name" value={user.name} required onChange={HandleEvent} />



                <SentimentVerySatisfiedIcon />
                <input type="text" placeholder="User Name" name="username" value={user.username} required onChange={HandleEvent} />



                <EmailIcon />
                <input type="email" placeholder="Email or Phone Number" name="email" value={user.email} required onChange={HandleEvent} />



                <LockOpenIcon />
                <input type="password" placeholder="Password" name="password" value={user.password} required onChange={HandleEvent} />



                <button className="Register-Action" onClick={Register}>REGISTER</button>

            </form>

            <h2>or </h2>

            <button className="Register-Action" onClick={Login} >LOGIN</button>


        </>
    )
}
