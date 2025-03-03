// const mongoose = require("mongoose");

// const bookingSchema = mongoose.Schema({
//     room: {
//         type: String,
//         required: true
//     }, roomid: {
//         // type: String,
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Room',
//         required: true
//     },
//     userid: {
//         type: String,
//         required: true
//     },

//     fromdate: {
//         type: String,
//         required: true
//     },
//     todate: {
//         type: String,
//         required: true
//     },
//     totalamount: {
//         type: String,
//         required: true
//     },
//     totaldays: {
//         type: String,
//         required: true
//     },
//     transactionId:{
//         type: String,
//         required:true
//        },
//     status:{
//         type: String,
//         required:true,
//         default:'booked'
//        }


// },
// {timestamps:true})
// const bookingmodel=mongoose.model('bookings',bookingSchema);
// module.exports=bookingmodel









const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    roomid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    userid: {
        type: String,
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
    totalamount: {
        type: String,
        required: true
    },
    totaldays: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'booked'
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
