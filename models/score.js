const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    type:{ type: String},
    date: {type: Date, default: Date.now, required:true},
    total_correct: { type: Number},
    total_questions: { type: String},
    question:{type:String},
    response: { type: String},
    hunt:[{
        type: Schema.Types.ObjectId,
        ref: "Hunt"
    }]
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
