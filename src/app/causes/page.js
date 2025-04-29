'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getCauses } from '../../api/causeData';
import CauseCard from '../../components/CauseCard';

function ViewAllCauses() {
  const [causes, setCauses] = useState([]);

  const causeScrollRef = useRef(null);

  const getAllTheCauses = () => {
    getCauses().then(setCauses);
  };

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  useEffect(() => {
    getAllTheCauses();
  }, []);

  return (
    <div>
      <div className="org-container">
        <h1 className="text-center mt-3">Popular Causes</h1>
      </div>

      {/* Causes Section */}
      <div style={{ position: 'relative' }}>
        <h2 className="text-center mt-3">Causes</h2>
        <Button className="scroll-arrow left" onClick={() => scrollLeft(causeScrollRef)}>
          ‹
        </Button>
        <div ref={causeScrollRef} className="d-flex flex-row px-3" style={{ overflowX: 'auto', scrollBehavior: 'smooth' }}>
          {causes.map((cause) => (
            <CauseCard key={cause.id} causeObj={cause} onUpdate={getAllTheCauses} />
          ))}
        </div>
        <Button className="scroll-arrow right" onClick={() => scrollRight(causeScrollRef)}>
          ›
        </Button>
      </div>
    </div>
  );
}

export default ViewAllCauses;
