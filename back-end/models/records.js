var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var records = new Schema({

    _id:{type:String,require:true},
    key: {type:String, require:true},
    value:{type:String, require:true},
    createdAt:{type:Date, require:true},
    counts:{type:Array, require:true}
});


module.exports = mongoose.model('Records',records);