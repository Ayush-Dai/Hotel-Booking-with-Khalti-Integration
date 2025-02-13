// // const express = require("express");
// // const router = express.Router();
// // const Booking = require("../models/Booking");
// // const moment = require('moment');
// // const Room = require('../models/room');

// // // Book a room
// // router.post("/bookroom", async (req, res) => {
// //     const {
// //         room,
// //         userid,
// //         fromdate,
// //         todate,
// //         totalamount,
// //         totaldays
// //     } = req.body;

// //     // Validate input data
// //     if (!room || !userid || !fromdate || !todate || !totalamount || !totaldays) {
// //         return res.status(400).json({ error: "Missing required fields" });
// //     }

// //     if (!moment(fromdate, 'DD-MM-YYYY', true).isValid() || !moment(todate, 'DD-MM-YYYY', true).isValid()) {
// //         return res.status(400).json({ error: "Invalid date format" });
// //     }

// //     try {
// //         const newbooking = new Booking({
// //             room: room.name,
// //             roomid: room._id,
// //             userid,
// //             fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
// //             todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
// //             totalamount,
// //             totaldays,
// //             transactionId: '1234'
// //         });

// //         const booking = await newbooking.save();

// //         // Fetch the room and validate
// //         const roomtemp = await Room.findOne({ _id: room._id });
// //         if (!roomtemp) {
// //             return res.status(404).json({ error: "Room not found" });
// //         }

// //         // Add booking to current bookings
// //         roomtemp.currentbookings.push({
// //             bookingid: booking._id,
// //             fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
// //             todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
// //             userid: userid,
// //             status: booking.status || "Pending" // Default status if not provided
// //         });

// //         await roomtemp.save();

// //         res.send("Room booked successfully");
// //     } catch (error) {
// //         console.error("Booking error:", error);
// //         return res.status(400).json({ error: error.message });
// //     }
// // });

// // // Delete a booking and update currentbookings
// // router.delete("/deletebooking/:id", async (req, res) => {
// //     const bookingId = req.params.id;

// //     try {
// //         // Find the booking
// //         const booking = await Booking.findById(bookingId);
// //         if (!booking) {
// //             return res.status(404).json({ error: "Booking not found" });
// //         }

// //         // Find the room
// //         const room = await Room.findById(booking.roomid);
// //         if (!room) {
// //             return res.status(404).json({ error: "Room not found" });
// //         }

// //         // Remove the booking from the room's currentbookings array
// //         room.currentbookings = room.currentbookings.filter(b => b.bookingid.toString() !== bookingId);
// //         await room.save();

// //         // Delete the booking
// //         await Booking.findByIdAndDelete(bookingId);

// //         res.send("Booking deleted successfully and room's currentbookings updated");
// //     } catch (error) {
// //         console.error("Error deleting booking:", error);
// //         return res.status(400).json({ error: error.message });
// //     }
// // });

// // module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");
// const moment = require('moment');
// const Room = require('../models/room');

// // Function to clean up currentbookings array
// async function cleanCurrentBookings(room) {
//     // Fetch all valid bookings for this room
//     const validBookings = await Booking.find({ roomid: room._id });

//     // Get the list of valid booking IDs
//     const validBookingIds = validBookings.map(booking => booking._id.toString());

//     // Filter the currentbookings array to keep only valid bookings
//     room.currentbookings = room.currentbookings.filter(booking => 
//         validBookingIds.includes(booking.bookingid.toString())
//     );

//     await room.save();
// }

// // Book a room
// router.post("/bookroom", async (req, res) => {
//     const {
//         room,
//         userid,
//         fromdate,
//         todate,
//         totalamount,
//         totaldays
//     } = req.body;

//     // Validate input data
//     if (!room || !userid || !fromdate || !todate || !totalamount || !totaldays) {
//         return res.status(400).json({ error: "Missing required fields" });
//     }

//     if (!moment(fromdate, 'DD-MM-YYYY', true).isValid() || !moment(todate, 'DD-MM-YYYY', true).isValid()) {
//         return res.status(400).json({ error: "Invalid date format" });
//     }

//     try {
//         const newbooking = new Booking({
//             room: room.name,
//             roomid: room._id,
//             userid,
//             fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
//             todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
//             totalamount,
//             totaldays,
//             transactionId: '1234'
//         });

//         const booking = await newbooking.save();

//         // Fetch the room and validate
//         const roomtemp = await Room.findOne({ _id: room._id });
//         if (!roomtemp) {
//             return res.status(404).json({ error: "Room not found" });
//         }

//         // Add booking to current bookings
//         roomtemp.currentbookings.push({
//             bookingid: booking._id,
//             fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
//             todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
//             userid: userid,
//             status: booking.status || "Pending" // Default status if not provided
//         });

//         await roomtemp.save();

//         res.send("Room booked successfully");
//     } catch (error) {
//         console.error("Booking error:", error);
//         return res.status(400).json({ error: error.message });
//     }
// });

// // Delete a booking and update currentbookings
// router.delete("/deletebooking/:id", async (req, res) => {
//     const bookingId = req.params.id;

//     try {
//         // Find the booking
//         const booking = await Booking.findById(bookingId);
//         if (!booking) {
//             return res.status(404).json({ error: "Booking not found" });
//         }

//         // Find the room and remove the booking from currentbookings
//         const room = await Room.findById(booking.roomid);
//         if (!room) {
//             return res.status(404).json({ error: "Room not found" });
//         }

//         // Remove booking from room's currentbookings array
//         room.currentbookings = room.currentbookings.filter(b => b.bookingid.toString() !== bookingId);

//         await room.save();

//         // Also remove the booking
//         await Booking.findByIdAndDelete(bookingId);

//         // Clean current bookings
//         await cleanCurrentBookings(room);

//         res.send("Booking deleted successfully and room's currentbookings updated");
//     } catch (error) {
//         console.error("Error deleting booking:", error);
//         return res.status(400).json({ error: error.message });
//     }
// });

// module.exports = router;







const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const moment = require('moment');
const Room = require('../models/room');

// Function to clean up currentbookings array
async function cleanCurrentBookings(room) {
    // Fetch all valid bookings for this room
    const validBookings = await Booking.find({ roomid: room._id });

    // Get the list of valid booking IDs
    const validBookingIds = validBookings.map(booking => booking._id.toString());

    // Filter the currentbookings array to keep only valid bookings
    room.currentbookings = room.currentbookings.filter(booking => 
        validBookingIds.includes(booking.bookingid.toString())
    );

    await room.save();
}

// Book a room
router.post("/bookroom", async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays
    } = req.body;

    // Validate input data
    if (!room || !userid || !fromdate || !todate || !totalamount || !totaldays) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (!moment(fromdate, 'DD-MM-YYYY', true).isValid() || !moment(todate, 'DD-MM-YYYY', true).isValid()) {
        return res.status(400).json({ error: "Invalid date format" });
    }

    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            totalamount,
            totaldays,
            transactionId: '1234'
        });

        const booking = await newbooking.save();

        // Fetch the room and validate
        const roomtemp = await Room.findOne({ _id: room._id });
        if (!roomtemp) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Add booking to current bookings
        roomtemp.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            userid: userid,
            status: booking.status || "Pending" // Default status if not provided
        });

        await roomtemp.save();

        res.send("Room booked successfully");
    } catch (error) {
        console.error("Booking error:", error);
        return res.status(400).json({ error: error.message });
    }
});

// Delete a booking and update currentbookings
router.delete("/deletebooking/:id", async (req, res) => {
    const bookingId = req.params.id;

    try {
        // Find the booking
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Find the room and remove the booking from currentbookings
        const room = await Room.findById(booking.roomid);
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Remove booking from room's currentbookings array
        room.currentbookings = room.currentbookings.filter(b => b.bookingid.toString() !== bookingId.toString());

        await room.save();

        // Also remove the booking
        await Booking.findByIdAndDelete(bookingId);

        // Clean current bookings
        await cleanCurrentBookings(room);

        res.send("Booking deleted successfully and room's currentbookings updated");
    } catch (error) {
        console.error("Error deleting booking:", error);
        return res.status(400).json({ error: error.message });
    }
});


// Get bookings by user ID
router.post("/getbookingsbyuserid",async (req,res)=>{
    const userid= req.body.userid;
try{
    const bookings=await Booking.find({userid:userid})
    res.send(bookings)
} catch(error){
    console.error("Error fetching bookings:",error)
    return res.status(400).json({error:error.message})
}

});

router.get("/getallbookings", async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(400).json({ error: error.message });
    }
});


module.exports = router;
