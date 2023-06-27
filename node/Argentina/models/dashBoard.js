const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
    date: {type:String,  required: false},
    quantity:{type:Number,  required: false},
    transactions:{type:Array,  required: true},
    transactionValue:{type:Number,  required: false},
    transactionType: {type:String,  required: true},
})

const DashBoardDB =  mongoose.model('portfolios', DashboardSchema);
module.exports = DashBoardDB