import React from 'react'
import "./Login.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from 'react-toastify';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
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
            <div classNameName="login-container">

                <h2>Sociallyy</h2>
                <div className="login-box">
                    <form>  <div className="user-box">
                        <input type="email" name="email" value={user.email} required onChange={HandleEvent} />
                        <label style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }} > <EmailIcon style={{ color: "azure" }} />&nbsp;Email</label>
                    </div>


                        <div className="user-box">
                            <input type="password" name="password" value={user.password} required onChange={HandleEvent} />
                            <label style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }} > <LockOpenIcon style={{ color: "azure" }} />&nbsp;Password</label>
                        </div>


                        <center>
                            <a onClick={Login}>
                                Login
                                <span></span>
                            </a></center>

                        <center>
                            <a onClick={Register}>
                                Register
                                <span></span>
                            </a></center>

                    </form>
                </div>
            </div>
        </>
    )
}
