import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import swal from 'sweetalert2';
import axios from 'axios';
import './PaymentCallback.css';

const PaymentCallback = () => {
  const location = useLocation();
  const bookingInitiatedRef = useRef(false);
  const [roomDetails, setRoomDetails] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalDays, setTotalDays] = useState(0);

  const bookRoom = async (room, fromdate, todate, totaldays, userId) => {
    const totalamount = totaldays * room.rentperday;

    const bookingDetails = {
      room,
      userid: userId,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };

    try {
      const result = await axios.post('/api/bookings/bookroom', bookingDetails);
      console.log('Room booked successfully:', result.data);

    

    } catch (error) {
      console.error('Error booking room:', error);
      alert('Booking failed. Please try again.');
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const transactionId = queryParams.get('transaction_id');

    console.log('Payment status:', status);
    console.log('Booking initiated:', bookingInitiatedRef.current);

    const bookingProcessed = localStorage.getItem('bookingProcessed');

    if (status === 'Completed' && bookingProcessed !== transactionId) {
      // Mark booking as initiated
      bookingInitiatedRef.current = true;
      localStorage.setItem('bookingProcessed', transactionId); // Use transactionId for uniqueness

      // Retrieve booking details from local storage
      const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));

      if (bookingDetails) {
        const { room, fromdate, todate, totaldays } = bookingDetails;
        const userId = JSON.parse(localStorage.getItem('currentUser'))._id;

        // Set room details in state
        setRoomDetails(room);
        setFromDate(fromdate);
        setToDate(todate);
        setTotalDays(totaldays);

        // Call bookRoom function
        bookRoom(room, fromdate, todate, totaldays, userId);
        swal.fire('Payment Successful', 'Room Booked Successfully', 'success');
      } else {
        console.error('Booking details not found in local storage');
        swal.fire('Error', 'Booking details not found. Please try again.', 'error');
      }
    } else if (status === 'User canceled') {
      console.error('Payment canceled by user');
      window.location.href = '/home'; // Redirect to home
    } else if (status !== 'Completed') {
      console.error('Payment failed or unknown status');
      swal.fire('Payment failed', 'Please try again', 'error');
      window.location.href = '/home'; // Redirect to home
    }
  }, [location]);

  return (
    <div className="payment-container">
      <h1>Thank You!</h1>
      <p>Your booking has been confirmed successfully. 🎉</p>
      {roomDetails && (
        <div className="booking-details">
          <h3>Booking Details</h3>
          <p><strong>Room Name:</strong> {roomDetails.name}</p>
          <p><strong>Check-in Date:</strong> {fromDate}</p>
          <p><strong>Check-out Date:</strong> {toDate}</p>
          <p><strong>Total Days:</strong> {totalDays}</p>
          <p><strong>Total Amount:</strong> Rs {roomDetails.rentperday * totalDays}</p>
        </div>
      )}
      <button
        className="btn-primary"
        onClick={() => window.location.href = '/Booked'}
      >
        View My Bookings
      </button>
    </div>
  );
};

export default PaymentCallback;
