import React from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { useState, useEffect } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import axios from 'axios';
import Loader from '../components/Loader';
import swal from 'sweetalert2';
import './Admin.css';

function AdminScreen() {

    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.isAdmin) {
            setIsAdmin(true);
        } else {
            window.location.href = '/home';
        }
    }, [])

    if (!isAdmin) {
        return "you are not authorized to access this page";
    }

    return (
        <div className='mt-3 ml-3 bs mr-3'>
            <h1>Welcome Admin</h1>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms />
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <AddRoom />
                </TabPane>

                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AdminScreen


export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        const fetchallBookings = async () => {
            try {
                const response = await (await axios.get('/api/bookings/getallbookings')).data;
                setBookings(response);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        };

        fetchallBookings();
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
            {bookings.length && (<h1>There are total {bookings.length} bookings</h1>)}
                {loading && <Loader />}



                <table className="table table-bordered table-responsive-sm table-dark custom-table">
                    <thead className='bs '>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => {
                            return (
                                <tr>
                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.room}</td>
                                    <td>{booking.fromdate}</td>
                                    <td>{booking.todate}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
               
            </div>
        </div>
    )
}


export function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedRoom, setSelectedRoom] = useState(null); // State to store the room being updated

    // Fetch all rooms on component mount
    useEffect(() => {
        const fetchAllRooms = async () => {
            try {
                const response = await axios.get('/api/rooms/getallrooms');
                setRooms(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        };
        fetchAllRooms();
    }, []);

    // Open the modal and set the selected room
    const handleUpdateClick = (room) => {
        setSelectedRoom(room); // Set the room to be updated
        setShowModal(true); // Show the modal
    };

    // Close the modal
    const handleCloseModal = () => {
        setShowModal(false); // Hide the modal
        setSelectedRoom(null); // Clear the selected room
    };

    // Handle form submission for updating the room
    const handleUpdateSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log("Form submitted"); // Debugging: Check if this logs when the button is clicked

        try {
            console.log("Updating room:", selectedRoom); // Debugging: Log the room data being sent
            const response = await axios.put(`/api/rooms/update/${selectedRoom._id}`, selectedRoom);
            console.log("Room updated:", response.data); // Debugging: Log the response from the API

            // Update the local state with the updated room
            setRooms(prevRooms =>
                prevRooms.map(room =>
                    room._id === selectedRoom._id ? { ...room, ...response.data } : room
                )
            );

            // Close the modal only after the state has been updated
            handleCloseModal();
            swal.fire({
                text: 'Room Updated Successfully',
                icon: 'success'

            }).then(result => {
                window.location.href = "/home"
            })
                .catch((e) => e);

        } catch (error) {
            console.error("Error updating room:", error);
            swal.fire('Oops', 'Something Went Wrong', 'error')
        }
    };

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedRoom(prevRoom => ({
            ...prevRoom,
            [name]: value
        }));
    };

    const handleDelete = async (roomId) => {
        try {
            // Confirm deletion with the user
            const result = await swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this room!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: false
            });

            // If the user confirms deletion
            if (result.isConfirmed) {
                // Make an API call to delete the room
                await axios.delete(`/api/rooms/delete/${roomId}`);
                console.log("Room deleted:", roomId);

                // Update the local state to remove the deleted room
                setRooms(prevRooms => prevRooms.filter(room => room._id !== roomId));

                // Show success message
                swal.fire('Deleted!', 'The room has been deleted.', 'success');
            } else if (result.dismiss === swal.DismissReason.cancel) {
                // If the user cancels deletion
                swal.fire('Cancelled', 'The room is safe :)', 'error');
            }
        } catch (error) {
            console.error("Error deleting room:", error);
            swal.fire('Oops!', 'Something went wrong while deleting the room.', 'error');
        }
    };

    return (
        <div className="row">
            <div className="col-md-12">
            {rooms.length > 0 && <h1>There are total {rooms.length} Rooms</h1>}
                {loading && <p>Loading...</p>}

                <table className="table table-bordered table-responsive-sm table-dark custom-table">
                    <thead className='bs'>
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per Day</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr key={room._id}>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentperday}</td>
                                <td>
                                    <Button onClick={() => handleUpdateClick(room)}>Update</Button>
                                </td>
                                <td>
                                    <Button style={{ backgroundColor: "red" }} onClick={() => handleDelete(room._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

              

                {/* Modal for updating room */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedRoom && (
                            <Form onSubmit={handleUpdateSubmit}>
                                <Form.Group controlId="formRoomName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={selectedRoom.name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formRoomType">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="type"
                                        value={selectedRoom.type}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formRoomRent">
                                    <Form.Label>Rent Per Day</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="rentperday"
                                        value={selectedRoom.rentperday}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" >
                                    Save Changes
                                </Button>
                            </Form>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}


export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();


    const handleDelete = async (userId) => {
        try {
            const result = await swal.fire({
                title: 'Are You Sure ?',
                text: 'You will not be able to recover this User!',
                icon: 'warning',
                showCancelButton: 'true',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: false
            });

            if (result.isConfirmed) {
                await axios.delete(`api/users/delete/${userId}`);
                console.log('User deleted Succssfully');

                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));

                swal.fire('Deleted!', 'The usesr has been deleted', 'success');

            } else if (result.dismiss === swal.DismissReason.cancel) {
                swal.fire("cancelled", 'The User Data is safe :)', 'error');
            }
        } catch (error) {
            console.log('Error deleting user', error);
            swal.fire(`OOps !, Something went wrong`, 'error');

        }
    }

    useEffect(() => {
        const fetchallUsers = async () => {
            try {
                const response = await (await axios.get('/api/users/getallusers')).data;
                setUsers(response);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        };

        fetchallUsers();
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
            {users.length && (<h1>There are total {users.length} Users</h1>)}
                {loading && <Loader />}



                <table className="table table-bordered table-responsive-sm table-dark custom-table">
                    <thead className='bs '>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (users.map(user => {
                            return (
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><Button style={{ backgroundColor: "red" }} onClick={() => handleDelete(user._id)}>Delete</Button></td>
                                </tr>
                            )
                        }))}

                    </tbody>
                </table>
               
            </div>
        </div>
    )
}


export function AddRoom() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [name, setName] = useState('')
    const [rentperday, setRentPerDay] = useState('')
    const [maxcount, setMaxCount] = useState('')
    const [description, setDescription] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [type, setType] = useState('')
    const [imageurls, setImageUrls] = useState('')
    const [imageurls2, setImageUrls2] = useState('')
    const [imageurls3, setImageUrls3] = useState('')

    async function addRoom() {
        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imageurls, imageurls2, imageurls3]
        }

        try {
            setLoading(true);
            const result = await (await axios.post('/api/rooms/addroom', newroom)).data
            console.log(result)
            setLoading(false);
            swal.fire('confirmed','Room Added Successfully', 'success').then(result => {
                window.location.href = "/home"
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            swal.fire('Oops', 'Something Went Wrong', 'error')
        }

    }



    return (
        <div className='row'>

            <div className="col-md-5">
                {loading && <Loader />}
                <input type="text"
                    className='form-control'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    placeholder='Room Name'
                />

                <input type="text"
                    className='form-control'
                    placeholder='Rent Per Day'
                    value={rentperday}
                    onChange={(e) => { setRentPerDay(e.target.value) }}
                />


                <input type="text"
                    className='form-control'
                    placeholder='Max Count'
                    value={maxcount}
                    onChange={(e) => { setMaxCount(e.target.value) }}
                />

                <input type="text"
                    className='form-control'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                />

                <input type="text"
                    className='form-control'
                    placeholder='Phone Number'
                    value={phonenumber}
                    onChange={(e) => { setPhoneNumber(e.target.value) }}
                />
            </div>

            {/* ..............left................................ */}


            <div className="col-md-5">
                <input type="text"
                    className='form-control'
                    placeholder='Type'
                    value={type}
                    onChange={(e) => { setType(e.target.value) }}
                />

                <input type="text"
                    className='form-control'
                    placeholder='Image Url 1'
                    value={imageurls}
                    onChange={(e) => { setImageUrls(e.target.value) }}
                />


                <input type="text"
                    className='form-control'
                    placeholder='Image Url 2'
                    value={imageurls2}
                    onChange={(e) => { setImageUrls2(e.target.value) }}
                />

                <input type="text"
                    className='form-control'
                    placeholder='Image Url 3'
                    value={imageurls3}
                    onChange={(e) => { setImageUrls3(e.target.value) }}
                />

                <div className="text-center">
                    <button className='btn mt-3' onClick={addRoom}>ADD ROOM</button>
                </div>


            </div>


        </div>
    )
}