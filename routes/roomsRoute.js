const express = require('express');

const router = express.Router();

const Room = require('../models/room')

router.get("/getallrooms", async (req, res) => {

    try {
        const rooms = await Room.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error });

    }


});


router.post("/getroombyid", async (req, res) => {
    const roomid = req.body.roomid;
    try {
        const room = await Room.findOne({ _id: roomid })
        res.send(room)
    } catch (error) {
        return res.status(400).json({ message: error });

    }


})

router.post("/addroom", async (req, res) => {
    // const {name,description,price,images,category,numOfReviews,stock,} = req.body;
    try {
        // const room=new Room({
        //     name,
        //     description,
        //     price,
        //     images,
        //     category,
        //     numOfReviews,
        //     stock,
        // })

        const newroom = new Room(req.body)
        await newroom.save()
        res.send('Room added successfully')
    } catch (error) {
        return res.status(400).json({ message: error });

    }


})

router.put("/update/:id", async (req, res) => {
    try {
        const getId = req.params.id;
        const ToUpdateData = req.body;
        const updatedData = await Room.findByIdAndUpdate(getId, ToUpdateData, { new: true });
        if (updatedData) {
            res.status(200).json({
                success: true,
                message: 'Room update successfully',
                data: updatedData
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: 'room not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false
        })
    }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        const getId = req.params.id;
        const DeleteData = await Room.findByIdAndDelete(getId);
        if (DeleteData) {
            res.status(200).json({
                success: true,
                message: 'room deleted successfully',
                data: DeleteData
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'room not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false
        })
    }
})

module.exports = router;