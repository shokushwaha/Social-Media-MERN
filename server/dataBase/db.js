const mongoose = require("mongoose")

let Connection = () => {
    try {
        mongoose.connect(process.env.MONGO_URL,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            })
        console.log("Database connected successfully")

    } catch (error) {
        console.log("Error connecting to the database", error)
    }

}

module.exports = { Connection }