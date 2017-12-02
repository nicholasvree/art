var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ClueSchema = new Schema({
    clue_order:{type: Number},    
    clue:{type: String},
    answer:{type:String},
    button1:{type:String},
    button2:{type:String},
    correct_message:{type:String},
    wrong_message:{type:String}   
});

var Clue = mongoose.model("Clue", ClueSchema);

// Export the Note model
module.exports = Clue;
