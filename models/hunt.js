const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const huntSchema = new Schema({
    title: { type: String, required: true },
    category: { type: Number, required: true},
    clue:[{
        type: Schema.Types.ObjectId,
        ref: "Clue"
    }]
});

const Hunt = mongoose.model("Hunt", huntSchema);

module.exports = Hunt;
