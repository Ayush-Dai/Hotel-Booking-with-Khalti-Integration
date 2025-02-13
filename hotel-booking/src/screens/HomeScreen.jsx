import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room"; // Import the Room component
import Loader from "../components/Loader";
import 'antd/dist/reset.css';
import Error from "../components/Error";
import { DatePicker } from 'antd';
import moment from 'moment';
import './HomeScreen.css';

const { RangePicker } = DatePicker;
const Homescreen = () => {
  const [rooms, setRooms] = useState([]); // State to hold room data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors
  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);

  const [searchKey, setsearchKey] = useState('');
  const [type, setType] = useState('all');
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/rooms/getallrooms");
        setRooms(response.data);
        setduplicaterooms(response.data);
        console.log("Fetched rooms:", response.data); // Log the fetched data

        // Log currentbookings for each room
        response.data.forEach(room => {
          console.log(`Room: ${room.name}, Current Bookings:`, room.currentbookings);
        });
      } catch (err) {
        console.error("Error fetching rooms:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);


  function filterByDate(dates) {
    if (!dates || dates.length < 2) {
      console.error("Invalid date range:", dates);
      return;
    }

    const startDate = dates[0]; // Keep as Moment object
    const endDate = dates[1]; // Keep as Moment object

    setFromdate(startDate.format('DD-MM-YYYY'));
    setTodate(endDate.format('DD-MM-YYYY'));

    const filteredRooms = duplicaterooms.filter(room => {
      if (room.currentbookings.length === 0) {
        console.log("Room has no bookings:", room);
        return true; // Available if no bookings
      }

      return room.currentbookings.every(booking => {
        const bookingStart = moment(booking.fromdate, 'DD-MM-YYYY');
        const bookingEnd = moment(booking.todate, 'DD-MM-YYYY');

        const isAvailable =
          endDate.isBefore(bookingStart) || startDate.isAfter(bookingEnd);

        console.log(
          `Room: ${room.name}, Available: ${isAvailable}`,
          `Booking Start: ${bookingStart.format('DD-MM-YYYY')}, Booking End: ${bookingEnd.format('DD-MM-YYYY')}`
        );

        return isAvailable;
      });
    });

    console.log("Filtered Rooms:", filteredRooms);
    setRooms(filteredRooms);
  }


  function fileterBySearch() {
    const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchKey.toLowerCase()));

    setRooms(temprooms);
  }

  function filterByType(e) {
    setType(e);
    if (e !== 'all') {
      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() == e.toLowerCase());
      setRooms(temprooms);
    }
    else{
      setRooms(duplicaterooms);
    }
  }




  //ant-picker
  // .ant-picker-input input:border nonoe imp
  return (
    <div className="containers">
      <div className="top-box">
      <div className="date-filter">
        <div className="range-picker">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
      </div>

      <div className="search-box">
        <input type="text"
          className="form-control"
          placeholder="Search Rooms"
          value={searchKey}
          onChange={(e) => { setsearchKey(e.target.value) }}
          onKeyUp={fileterBySearch}
        />

      </div>

      <select className="sel-type" value={type} onChange={(e) => { filterByType(e.target.value) }}>
        <option value="all">All</option>
        <option value="deluxe">Deluxe</option>
        <option value="non-deluxe">Non-Deluxe</option>
      </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          {rooms.map((room) => (
            <div key={room._id} className="col-md-4">
              <Room room={room} fromdate={fromdate} todate={todate} /> {/* Pass room data to Room component */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Homescreen;
