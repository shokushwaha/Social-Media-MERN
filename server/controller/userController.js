
const { User } = require("../Schema/user-schema");
const { UserFollow } = require("../Schema/follow")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {

    const { name, username, email, password, _id } = req.body
    const user = await User.findOne({ email: email })

    if (user) {
        res.send({ message: "User Already Exists" })
    }
    else {

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name: name,
            username: username,
            email: email,
            password: hashedPassword,
            profile: {
                banner: "",
                dp: ""
            }
        })

        newUser.save(err => {
            if (err) {
                res.send(err)

            } else {
                const token = jwt.sign({ email: email, id: _id }, process.env.JSON_KEY)
                res.status(201).send({ user: newUser, token: token, message: "Registered Successfully" })

            }
        })

    }


}

const login = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
        const matchedPassword = await bcrypt.compare(password, user.password)
        if (matchedPassword) {
            const token = jwt.sign({ email: email, id: user._id }, process.env.JSON_KEY)
            res.status(201).json(
                {
                    loggeduser: user,
                    token: token,
                    message: "Login Successfully"
                }
            )
        }
        else {
            res.send({ message: "Invalid Password" })
        }
    }

    else {
        res.send({ message: "User Not Registered" })
    }

}
const logOut = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id })
        res.status(201).json({
            loggeduser: null,
            token: null,
            message: "Logged Out Successfully"
        })
    } catch (error) {
        res.status(201).json({ message: error })

    }
}
const UserData = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id })
        res.status(201).json(user)
    } catch (error) {
        res.status(201).json({ message: error })

    }
}


const LoggedUser = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.userId })
        res.status(201).json(user)
    } catch (error) {
        res.status(201).json({ message: error })

    }

}

const UpdateProfilePic = async (req, res) => {

    let file = req.file.originalname;
    let user = await User.findOne({ _id: req.userId });
    let data = {
        ...user,
        profile: {
            dp: file,
            banner: ""
        }
    }
    let newuser = new User(data)


    try {
        await User.updateOne({ _id: req.userId }, { $set: newuser })
        res.status(201).json(newuser)

    } catch (error) {

    }
}

const GetLimitData = async (req, res) => {

    let CurrentUser = req.userId

    try {

        let user = await User.find({ _id: { $ne: CurrentUser } }).limit(3);
        res.status(201).json(user)

    } catch (error) {
        res.status(201).json({ message: error })

    }
}

const Follow = async (req, res) => {

    let CurrentUser = req.userId;
    let UserToFollow = req.headers.userid;

    let newFollow = new UserFollow({
        followedBy: CurrentUser,
        following: UserToFollow
    })


    try {
        newFollow.save();
        res.status(201).json({ message: "Followed", })
    } catch (error) {
        res.status(401).json({ message: error })
    }
}

const UnFollow = async (req, res) => {

    let CurrentUser = req.userId;
    let UserToFollow = req.headers.userid;

    try {
        let deleteFollow = await UserFollow.deleteOne({ followedBy: CurrentUser });
        res.status(201).json({ message: "Unfollow" })
    } catch (error) {
        res.status(401).json({ message: error })
    }


}

const GetFollowedUser = async (req, res) => {

    let CurrentUser = req.userId;
    let UserToFollow = req.headers.userid;

    console.log(CurrentUser, UserToFollow)

    try {
        let result = await UserFollow.findOne({ following: UserToFollow });
        let result2 = await UserFollow.findOne({ followedBy: CurrentUser });
        if (result && result2) {
            res.status(201).json({ followed: true, UserToFollow })
        }
        else {
            res.status(201).json({ followed: false, UserToFollow })

        }

    } catch (error) {
        res.status(401).json({ message: err })
    }


}

module.exports = {
    register, login, logOut, UserData, LoggedUser, UpdateProfilePic,
    GetLimitData, Follow, UnFollow, GetFollowedUser
}