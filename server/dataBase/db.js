const mongoose = require("mongoose")

let Connection = () => {
    try {

        mongoose.connect('mongodb://localhost:27017/socially', { useUnifiedTopology: true, useNewUrlParser: true })
        console.log("Data Base Connected Successfully")

    } catch (error) {
        console.log("error While Connecting With Data Base", error)

    }

}

module.exports = { Connection }