const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    completed_date: { type: Date, required: true },
    total_correct: { type: Number, required: true},
    total_questions: { type: String, required: true}
    hunt:[{
        type: Schema.Types.ObjectId,
        ref: "Hunt"
    }]
});

const Score = mongoose.model("Score", huntSchema);

module.exports = Score;
