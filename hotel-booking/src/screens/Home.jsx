import React from 'react';
import './Home.css';
function Home() {

  return (
    <>
      <div className="homeScreen">
        <img
          className='img-home'
          src='/assets/image/hamrod.png'
        />

        <div className='home-text'>
          <h1 >Welcome To Hamro Hotel</h1>
          <p>
            Experience comfort, luxury, and exceptional hospitality at Hamro Hotel.
            Nestled in the heart of Illam, we offer a perfect blend of modern amenities and warm hospitality to make your stay truly memorable.
            Surrounded by breathtaking tea gardens and misty hills, Hamro Hotel provides a
            serene escape from the hustle and bustle of everyday life. 
          </p>

          <p className='last-text'>
          Book your stay with us today and discover the essence of luxury and tranquility 
          at Hamro Hotel your home in Illam.
          </p>
        </div>

      </div>
    </>
  )



}

export default Home;
