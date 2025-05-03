import React from 'react';

export default function TestPage() {
  return (
    <div className="hero p-5">
      <div>
        <div className="d-flex align-items-center h-100">
          <div className="text-white">
            <h1 className="hero-heading mb-3">Volunteer Match</h1>
            <h4 className="hero-subheading mb-3">Where we give a shit</h4>
            <br />
            <a data-mdb-ripple-init className="btn btn-outline-light btn-lg" href="/community" role="button">
              Community
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
