// const mongoose= require("mongoose");

// const roomSchema= mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     maxcount:{
//         type:Number,
//         required: true
//     },
//     phonenumber:{
//         type:Number,
//         required: true
//     },
//     rentperday:{
//         type:Number,
//         required:true
//     },
//     imageurls:[],
//     currentbookings:[],
//     type:{
//         type:String,
//         required: true
//     },
//     description:{
//         type:String,
//         required:true
//     },
// },{
//     timestamps: true,
// })

// const roomModel=mongoose.model('rooms', roomSchema)

// module.exports=roomModel




const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageurls: {
        type: [String],
        required: true
    },
    rentperday: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    maxcount: {
        type: Number,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    currentbookings: [{
        bookingid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
            required: true
        },
        fromdate: {
            type: String,
            required: true
        },
        todate: {
            type: String,
            required: true
        },
        userid: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'booked'
        }
    }]
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
