import React from 'react'
import "./Login.css"

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from 'react-toastify';

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
export default function Login() {
    const Navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    let HandleEvent = (e) => {
        const { name, value } = e.target

        setUser({ ...user, [name]: value })
    }

    const token = localStorage.getItem("token")

    let Login = (e) => {
        e.preventDefault()

        if (user.email && user.password) {
            fetch("/user/login", {
                method: "Post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then((resp) => {
                resp.json().then((data) => {
                    if (data.message == "Login Successfully") {
                        console.log(data)
                        toast.success(`${data.message}`, {
                            position: 'top-center',
                        })

                        localStorage.setItem("user", JSON.stringify(data.loggeduser))
                        localStorage.setItem("token", data.token)
                        window.location.href = "/";

                    }
                    else {
                        toast.error(`${data.message}`, {
                            position: 'top-center',
                        })
                    }
                })
            })
        }
        else {
            toast.warn(`Fill all the credentials`, {
                position: 'top-center',
            })
        }
    }

    let Register = () => {
        Navigate("/register")
    }

    return (
        <>
            <h2>Sociallyy</h2>
            <p>Being Social</p>
            <h2>Socially</h2>
            <form>
                <EmailIcon />
                <input type="email" placeholder="Email or Phone Number" name="email" onChange={HandleEvent} />
                <LockIcon />
                <input type="password" placeholder="Password" name="password" onChange={HandleEvent} />
                <button className="Register-Action" onClick={Login}>LOGIN</button>
            </form>
            <h2>or</h2>
            <button className="Register-Action" onClick={Register} >REGISTER</button>
            <h3>Forgot Password ?</h3>
        </>
    )
}
