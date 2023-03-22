const { Post } = require("../Schema/post-schema")
const { User } = require("../Schema/user-schema")
const { PostLove } = require("../Schema/postreaction")

let PostActionLove = async (req, res) => {

    let postId = req.headers.postid
    let userId = req.userId

    let likecreate = await PostLove.findOne({ postId: postId, userId: userId })

    let postLove = {
        postId: postId,
        userId: userId
    }

    const newpost = new PostLove(postLove)

    await newpost.save()
    res.status(201).json(newpost)


}

let GetPostLove = async (req, res) => {

    try {
        let likePost = await PostLove.find({});
        res.status(201).json(likePost)
    } catch (error) {
        res.status(401).json({ message: "Some thing went wrong" })
    }

}

let DeletePostLove = async (req, res) => {
    try {

        await PostLove.deleteOne({ postId: req.headers.id, userId: req.userId });

        res.status(201).json({ message: "Action Perform Successfully" })

    } catch (error) {
        res.status(401).json({ message: "Something went Wrong" })
    }
}



module.exports = { PostActionLove, GetPostLove, DeletePostLove } 