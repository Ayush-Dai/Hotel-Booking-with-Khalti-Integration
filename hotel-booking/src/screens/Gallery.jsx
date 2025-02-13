import React from 'react';
import './gallery.css';


const Gallery = () => {
  return (
    <div className="gallery-container">
      <p className="gallery-description">
        Explore the beauty of Hamro Hotel through these images, showcasing our luxurious rooms, exquisite dining,
        stunning views, and more. Let our visuals inspire your stay with us.
      </p>

      <div className="gallery-grid">
        <div className="gallery-item">
          <img src="/assets/image/cozy.png" alt="Hotel Room" className="gallery-image" />
          <p className="gallery-caption">Luxurious Rooms</p>
        </div>
        <div className="gallery-item">
          <img src="/assets/image/dining2.png" alt="Dining Area" className="gallery-image" />
          <p className="gallery-caption">Elegant Dining Experience</p>
        </div>
        <div className="gallery-item">
          <img src="/assets/image/lobby.png" alt="Lobby Area" className="gallery-image" />
          <p className="gallery-caption">Warm and Inviting Lobby</p>
        </div>
        <div className="gallery-item">
          <img src="/assets/image/illam.png" alt="Hotel View" className="gallery-image" />
          <p className="gallery-caption">Spectacular View of Ilam</p>
        </div>
        <div className="gallery-item">
          <img src="/assets/image/pool.png" alt="Swimming Pool" className="gallery-image" />
          <p className="gallery-caption">Relaxing by the Pool</p>
        </div>
        <div className="gallery-item">
          <img src="/assets/image/parking.png" alt="Spa" className="gallery-image" />
          <p className="gallery-caption">Parking</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
