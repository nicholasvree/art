const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true},
    score:[{
        type: Schema.Types.ObjectId,
        ref: "Score"
    }],
    image: [{
        type: Schema.Types.ObjectId,
        ref: "Image"
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
