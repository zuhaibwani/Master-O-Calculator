const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true
    }
})

const UserModal = mongoose.model("user", UserSchema)

module.exports = UserModal;