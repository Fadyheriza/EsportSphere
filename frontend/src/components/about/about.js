import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="container my-5">
      <div className="box">
        <h1 className="about-title">About Us</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Why We Created This Site?</h5>
            <p className="card-text">We wanted to create EsportSphere because there was nothing like it around. We were unhappy with other sites and services and just wanted to provide the best Esport site on the internet.</p>
          </div>
        </div>
      </div>
      <div className="box mt-5">
        <h2>Q & A</h2>
        <div className="faq">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">How do I register for a tournament?</h5>
              <p className="card-text">We are currently working on a feature that will let our users register for some tournaments, but all in all we are focusing on pro team tournaments and statistics.</p>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">What games are supported on EsportSphere?</h5>
              <p className="card-text">Currently, we support CS2. We are continuously working to add more games to our platform.</p>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">How can I contact support?</h5>
              <p className="card-text">You can contact our support team by clicking on the 'Contact Us' link at the bottom of the page. Fill out the contact form with your details and query, and our team will get back to you as soon as possible.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
