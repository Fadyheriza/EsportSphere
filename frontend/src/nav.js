import React from 'react';

const Nav = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4"> {/* Added mb-4 for margin bottom */}
        <div className="container">
          {/* Navigation Links */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mb-4 d-flex justify-content-center"> {/* Added d-flex justify-content-center to center the form */}
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ maxWidth: '200px' }} /> {/* Added inline style to set max-width */}
          <button className="btn btn-outline-primary" type="submit">Search</button>
        </form>
      </div>
    </>
  );
};

export default Nav;
