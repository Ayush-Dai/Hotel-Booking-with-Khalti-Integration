import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const currentDate = moment().format('DD-MM-YYYY');
  const currentUser= localStorage.getItem("currentUser");

  console.log("Room Component Props:", { room, fromdate, todate, currentDate });

  return (
    <div className='room-card'>
      <div className='room-image'>
        <img src={room.imageurls[0]} alt={room.name} className='room-image-img' />
      </div>
      <div className='room-details'>
        <h1>{room.name}</h1>
        <p><strong>Max Count:</strong> {room.maxcount}</p>
        <p><strong>Rent Per Day:</strong> {room.rentperday}</p>
        <p><strong>Type:</strong> {room.type}</p>

        {fromdate &&
          todate &&
          moment(fromdate, 'DD-MM-YYYY').isValid() &&
          moment(todate, 'DD-MM-YYYY').isValid() &&
          moment(fromdate, 'DD-MM-YYYY').isSameOrAfter(moment().startOf('day')) && (
            <Link to={currentUser === null ? `/login` : `/book/${room._id}/${fromdate}/${todate}`}>
              <button className='btn btn-primary'>Book Now</button>
            </Link>
          )}
        <button className='btn btn-primary' onClick={handleShow}>View Details</button>
      </div>

      {/* Modal Section */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel='' nextLabel=''>
            {room.imageurls && room.imageurls.length > 0 ? (
              room.imageurls.map((url, index) => (
                <Carousel.Item key={index}>
                  <img className='d-block-w-100 bigimg' src={url} alt="Room slide" />
                </Carousel.Item>
              ))
            ) : (
              <p>No images available</p>
            )}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
