import React from 'react'

export default function Profile() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const parseUser = JSON.parse(user);
    const bannerPic = parseUser.profile.banner;
    const dpPic = parseUser.profile.dp;
    console.log(parseUser);


    return (
        <>

            <h2>{parseUser.name}</h2>
            <h2>{parseUser.username}</h2>
            <h2>{parseUser.email}</h2>
            <img src={bannerPic} alt="banner" />
            <img src={dpPic} alt="dp" />

        </>
    )
}
