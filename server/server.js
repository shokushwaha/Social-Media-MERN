require("dotenv").config()
const express = require("express");
const app = express();
const { Connection } = require("./dataBase/db")
const { userRouter } = require("./routes/userRoutes")
const { postRouter } = require("./routes/postRoutes")
const { postReaction } = require("./routes/postReaction")
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use("/Files", express.static("Files"))


app.use("/user", userRouter)
app.use("/post", postRouter)
app.use("/reaction", postReaction)

Connection()

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    console.log("Server is running....")
})
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})