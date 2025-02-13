import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';



function BookingScreen() {
    let { roomid, fromdate, todate } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [room, setRoom] = useState();
    const formattedFromDate = moment(fromdate, 'DD-MM-YYYY'); 
    const formattedToDate = moment(todate, 'DD-MM-YYYY'); 
    const totaldays = moment.duration(formattedToDate.diff(formattedFromDate)).asDays() + 1; // Calculate total days
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setLoading(true);
                const response = await axios.post("/api/rooms/getroombyid", { roomid });
                setRoom(response.data);
                console.log("Fetched rooms:", response.data); 
                setLoading(false);
              
            }
            catch (error) {
                setLoading(false);
              
                setError(true);
            }
        }
        fetchRoom();
    }, [roomid]);

    const handlePay = async (rooms, user) => {
        console.log("hello world", rooms.id);
        console.log(import.meta.env.VITE_BACKEND_URL);
        console.log(import.meta.env.VITE_SUCCESS_URL);
        console.log(rooms.name);
        console.log(rooms._id);

         let totalpaisa =(rooms.rentperday * totaldays*100);
       console.log(totalpaisa);
''
    //    const payload = {
    //         "return_url":import.meta.env.VITE_SUCCESS_URL,
    //         "website_url":import.meta.env.VITE_WEBSITE_URL,
    //         "amount" :parseInt(totalpaisa)*100,
    //         "purchase_order_id":rooms._id,
    //         "purchase_order_name": rooms.name,
    //         "customer_info": {
    //             "name": `${user.name}`,
    //             "email": `${user.email}`                
    //         },
    //         "amount_breakdown": [
    //             {
    //                 "label": "Total Price",
    //                 "amount":totalpaisa
    //             }
                
    //         ],
    //         "product_details": [
    //             {
    //                 "identity": `${rooms._id}`,
    //                 "name":`${rooms.name}`,
    //                 "total_price":totalpaisa,   
    //                 "quantity": 1,                 
    //          "unit_price": `${rooms.rentperday}`
    //             }
    //         ]
    //       }



    const payload = {
        return_url: import.meta.env.VITE_SUCCESS_URL,
        website_url: import.meta.env.VITE_WEBSITE_URL,
        amount: totalpaisa,
        purchase_order_id: rooms._id,
        purchase_order_name: rooms.name,
        customer_info: {
          name: user.name,
          email:user.email,
        },
      };

      const bookingDetails = {
        room,
        fromdate,
        todate,
        totaldays,
      };
      localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/khalti-api`, payload);
            console.log(`Yo khalti ko ressponse hoi ${response.data}    `);  
            setLoading(false);            
            if (response) {
                window.open(response.data.data.payment_url, '_blank');
                // window.location.href = '/home';
              } else {
                console.error('Payment URL not found in the response:', response.data);
              }
            
        } catch (error) {
            console.error('API Request Error:', error.message);
            console.error('Error Details:', error.response || error);
        }
        
    };





    return (
        <div className='card'>
            {loading ? (<Loader/>) : room ? (
                <div>
                    <div className="row-book mt-5 bs">
                        <div className="col-md-6" >
                            <h1>{room.name}</h1>
                            <img src={room.imageurls[0]} alt="img" className='bigimg' />
                        </div>

                        <div className="col-md-6" style={{ textAlign: 'right' }} >
                            <div>
                                <h1>Booking Details</h1>
                                <hr />
                                <b>
                                    <p>Name :{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                    <p>From Date : {formattedFromDate.format('DD-MM-YYYY')} </p>
                                    <p>To Date : {formattedToDate.format('DD-MM-YYYY')}</p>
                                    <p>Max Count : {room.maxcount}</p>
                                </b>
                            </div>
                            <div>
                                <h1>Amount</h1>
                                <hr />
                                <b>
                                    <p>Total Days :{totaldays} </p>
                                    <p>Rent Per Days : {room.rentperday} </p>
                                    <p>Total Amount : {totaldays * room.rentperday}</p>
                                </b>
                            </div>
                            <div style={{ float: 'right' }}>
                                <button className='btn btn-primary' onClick={() => handlePay(room, user)}>Pay Now</button>
                             
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<Error/>)}
        </div>
    );
}

export default BookingScreen;
