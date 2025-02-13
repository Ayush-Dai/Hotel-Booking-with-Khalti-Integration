const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require('cors');

const app = express();
const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/userRoute')
const bookingsRoute = require('./routes/bookingsRoute')
app.use(express.json());



const corsOptions = {
  origin: 'http://localhost:5173',// React application's origin  
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));




app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)


app.post("/khalti-api", async (req, res) => {
  const payload = req.body;
  console.log(payload);

  const khaltiResponse = await axios.post
    ('https://a.khalti.com/api/v2/epayment/initiate/',
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });

  if (khaltiResponse) {
    res.json({
      success: true,
      data: khaltiResponse?.data
    })
  } else {
    res.json({
      success: false,
      message: "Something went wrong"
    })
  }
  console.error(payload);
  console.log(khaltiResponse);
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));