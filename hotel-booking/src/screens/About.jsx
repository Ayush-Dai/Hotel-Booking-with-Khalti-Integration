import React from 'react';
import Footer from './Footer';
import './About.css';

function About() {
  return (
    <div className="about-main">
    <div className="about-container">
      <section className="about-section">
        <h2>Our History</h2>
        <hr />
        <p>
        Founded in 2005, Hamro Hotel began as a vision to create a warm and welcoming retreat in the heart of Illam. What started as a small, family-run establishment has grown into a renowned destination known for its exceptional service and hospitality. Over the years, we have embraced modern luxury while staying true to our roots—offering guests a place where tradition meets comfort. Today, we continue to provide unforgettable experiences, ensuring every stay feels like home.
        </p>
      </section>
      <section className="about-section">
        <h2>Our Mission</h2>
        <hr />
        <p>
        At Hamro Hotel, our mission is to provide exceptional hospitality that creates unforgettable experiences for every guest. We are committed to offering comfort, luxury, and personalized service, ensuring that every stay is as relaxing as it is memorable. With a dedication to excellence, sustainability, and genuine care, we strive to be more than just a hotel—we aim to be a home away from home for travelers from around the world.        </p>
      </section>
      <section className="about-section">
        <h2>Our Vision</h2>
        <hr />
        <p>
        At Hamro Hotel, our vision is to be a leading destination for hospitality, known for our exceptional service, comfort, and innovation. We strive to create a place where guests feel valued, inspired, and at home, whether they are traveling for leisure or business. With a commitment to sustainability, community engagement, and continuous improvement, we aim to redefine hospitality by blending modern luxury with heartfelt tradition, ensuring unforgettable experiences for every guest.        </p>
      </section>
      <section className="about-section">
        <h2>Our Team</h2>
        <hr />
        <p>
        
        At Hamro Hotel, our team is dedicated to providing warm hospitality and exceptional service. With passion and professionalism, we work together to ensure every guest enjoys a comfortable and memorable stay.        </p>
      </section>
      <section className="about-section">
        <h2>Contact Us</h2>
        <hr />
        <p>
          Have any questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:contact@hotelbooking.com">contact@hotelbooking.com</a>.
        </p>
      </section>
    </div>
    <Footer/>
    </div>
  
  );
}

export default About;