import React from 'react'
import './LeftNavBar.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
export default function LeftNavBar() {
    const Navigate = useNavigate();
    return (
        <>
            <div className="leftNav">

                <h2>

                    Sociallyy
                </h2>
                <div className="singleIcon">
                    <HomeIcon /> Home
                </div>

                <div className="singleIcon"><ForumIcon /> Messages </div>
                <div className="singleIcon"><NotificationsIcon />Notifications </div>



                <div className="singleIcon" onClick={() => Navigate('/profile/:id')} ><PersonIcon /> Profile</div>

                <div className="singleIcon"><SettingsIcon />Settings</div>

            </div>
        </>
    )
}
