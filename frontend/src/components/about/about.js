import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="container my-5">
      <div className="box">
        <h1 className="about-title">About Us</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Why We Created This Site</h5>
            <p className="card-text">We wanted to create EsportSphere because there was nothing like it around. We were unhappy with other sites and services and just wanted to provide the best Esport site on the internet.</p>
          </div>
        </div>
      </div>
      <div className="box mt-5">
        <h2>Common Questions and Answers</h2>
        <div className="faq">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Question 1</h5>
              <p className="card-text">Answer to question 1.</p>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Question 2</h5>
              <p className="card-text">Answer to question 2.</p>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Question 3</h5>
              <p className="card-text">Answer to question 3.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;