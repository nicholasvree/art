const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    brook_id: { type: Number, required: true},
    title: { type: String, required: true},
    primary_image: { type: String}
});

const Score = mongoose.model("Image", imageSchema);

module.exports = Score;
