import React from 'react'
import hamroImage from '../assets/images/hamro.jpg';

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    function logout() {
        localStorage.removeItem('currentUser');
        // setUser(null)
        window.location.href = '/'

    }




    return (
        <div>
            <nav class="navbar navbar-expand-lg ">

                <a href="/">
                    <img className="img" src={hamroImage} alt="Hamro Hotel" />
                </a>
                <div className="nav-cent">
                    <li class="nav-item active">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item active">
                        <a className="nav-link" href="/about">About Us</a>
                    </li>

                    <li class="nav-item active">
                        <a className="nav-link" href="/Gallery">Gallery </a>
                    </li>
                    <li class="nav-item active">
                        <a className="nav-link" href="/home">Rooms</a>
                    </li>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mr-60  ms-auto">

                        {user ? (<>
                            <div class="dropdown" >
                                <button class="btnb btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1)}
                                </button>
                                <div class="dropdown-menu w-20 custom-dropdown" aria-labelledby="dropdownMenuButton" >
                                    {currentUser.isAdmin === true ? (<a class="dropdown-item" href="/admin">Manage</a>) :
                                        (<a class="dropdown-item" href="/Booked">Bookings</a>)}

                                    <a class="dropdown-item" href="#" onClick={logout}>Logout</a>
                                </div>
                            </div>
                        </>)
                            : (<>
                                <li class="nav-item active">
                                    <a class="nav-link" href="/register">Register</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/login">Login</a>
                                </li>
                                {/* </div> */}
                            </>)}

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar