import React from 'react';

const Nav = () => {
  return (
    <div className="container text-center my-4">
      <a className="mx-2 text-dark" href="/">Home</a>
      <a className="mx-2 text-dark" href="/about">About</a>
      <a className="mx-2 text-dark" href="/contact">Contact</a>
      <div className="mt-4">
        <form className="d-inline-block">
          <input className="form-control d-inline-block me-2" type="search" placeholder="Search" aria-label="Search" style={{ maxWidth: '200px' }} />
          <button className="btn btn-outline-primary" type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Nav;