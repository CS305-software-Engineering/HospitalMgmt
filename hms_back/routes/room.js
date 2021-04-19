const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const cors = require('cors');
const User = require("../models/User");

const verifyToken = require("../auth/verifytoken");
const Room = require("../models/Room");

const app = router;

app.post('/add_room', async (req, res) => {
    const room_no = req.body.room_no;
    Room.findOne({ room_no }, function (err, room) {
        console.log(room);
        if (room)
            res.json("Room exists");
        else {
            const newRoom = new Room({
                name: "",
                age: 0,
                gender: "",
                booking_date: Date(Date.now),
                release_date: "2100-12-31",
                room_no: req.body.room_no,
                room_status: "added",
                email: ""

            })
            newRoom.save()
                .then(room => res.json("success"))
                .catch(err => res.json(err));
        }
    })
})

app.post('/book_room', verifyToken, async (req, res) => {
    console.log(req);
    var user_email = "";
    await User.findById(req.userId, function (err, user) {
        user_email = user.email;
    })

    /* Room.findOne({ room_no }, function (err, room) {
         if (room.room_status === "booked"||room.room_status==="pending") {
             const end_date = new Date(Number(room.booking_date))
             const req_booking_date = new Date(Number(Date.parse(req.body.booking_date)))
             end_date.setDate(room.booking_date.getDate() + room.no_of_days);
             if (req_booking_date.getTime() <= end_date.getTime() && req_booking_date.getTime() >= room.booking_date.getTime()) {
                return res.json("Room is booked during this period");
             }
 
         }*/
    const newRoom = new Room({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        booking_date: Date.parse(req.body.booking_date),
        release_date: Date.parse(req.body.release_date),
        room_status: "pending",
        email: user_email,
        room_no:req.body.room_no
    })
    newRoom.save()
        .then(room => res.json("success"))
        .catch(err => res.json("failure"));


})



app.get('/pending_rooms', async (req, res) => {
    Room.find({ room_status: "pending" }, function (err, rooms) {
        if (err) return res.status(500).send("There was a problem finding the rooms.");
        if (!rooms) return res.status(404).send("No pending room requests found.");
        res.status(200).json(rooms);
    });
})

app.post('/confirm_room', async (req, res) => {
    Room.findById(req.body.roomid, function (err, room) {
        if (err) return res.status(500).send("There was a problem finding the room.");
        if (!room) return res.status(404).send("No room found.");
        console.log(room.name);
        room.room_status = "booked";

        room.save()
            .then(user => res.json('success'))
            .catch(err => res.json('Invalid'));

    })
})

app.post('/reject_room', async (req, res) => {
    Room.findById(req.body.roomid, function (err, room) {
        if (err) return res.status(500).send("There was a problem finding the room.");
        if (!room) return res.status(404).send("No room found.");
        room.room_status = "rejected";
        room.save()
            .then(user => res.json('success'))
            .catch(err => res.json('Invalid'));
    })
})

app.get('/all_rooms',verifyToken, async (req, res) => {
    Room.find({room_status:"added"},function (err, rooms) {
        if (err) return res.status(500).json("There was an error in finding rooms");
        else
            res.json(rooms);
    })
})

app.post('/get_rooms', verifyToken,async (req, res) => {
    Room.find({ booking_date: { $lte: req.body.booking_date }, release_date: { $gte: req.body.release_date } ,room_status:{$ne: "added"}}, function (err, rooms) {
        if (err) return res.status(500).send("There was a problem finding the room.");
        if (!rooms) return res.status(404).send("No room found.");
        res.json(rooms);
    })
})

app.get('/get_rooms_request', verifyToken, async (req, res) => {
    var user_email = "";
    await User.findById(req.userId, function (err, user) {
        user_email = user.email;
    })
    Room.find({ email: user_email }, function (err, rooms) {
        if (err)
            return res.json("Error in fetching room details.")
        res.json(rooms);
    })
})

module.exports = app;