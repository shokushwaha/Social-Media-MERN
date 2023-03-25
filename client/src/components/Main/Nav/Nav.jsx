import React from 'react'
import "./Nav.css"
import { toast } from 'react-toastify';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginPage from '../../../pages/LoginPage';
import { Button } from '@mui/material';
export default function Nav() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const parseUser = JSON.parse(user);


    const handleLogOut = async () => {
        try {

            const resp = await fetch("http://localhost:5000/user/logOut", {
                method: "Delete",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"

                }
            })
            if (resp) {
                toast.success("Logged Out Successfully")
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.reload('/');
            }
            else {
                toast.error("Some error occured");
            }

        } catch (error) {
            toast.error("Some error occured");

        }
    }

    if (!token)
        return <LoginPage />
    return (
        <>
            <div className="navBox">


                <div className="userInfo">
                    <AccountBoxIcon />
                    {parseUser.name}
                </div>

                <div className="userInfo">UserName :  {parseUser.username}</div>


                <Button variant="outlined" color="error" onClick={handleLogOut} >Log Out</Button>
            </div>

        </>
    )
}
