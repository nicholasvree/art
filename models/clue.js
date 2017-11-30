var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ClueSchema = new Schema({
    clue:{type: String, required:true},
    clue_order:{type: Number, required:true},
    answer:{type:String, required:true}
});

var Clue = mongoose.model("Clue", ClueSchema);

// Export the Note model
module.exports = Clue;
