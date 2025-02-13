import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Booked.css'

function Booked() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
        setRooms(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='booked-screen'>
      <h1>Bookings Detail</h1>
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room._id} className="room-detai">
            <h2>{room.room}</h2> 
            <hr />          
            <p className='para'><strong>Check-in date:</strong> {room.fromdate}</p>
            <p className='para'><strong>Check-out date:</strong> {room.todate}</p>
            <p className='para'><strong>Total days:</strong> {room.totaldays}</p>
            <p className='para'><strong>Total amount:</strong> Rs {room.totalamount}</p>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}

export default Booked;