'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getCauses } from '../../api/causeData';
import { getOrganizations } from '../../api/organizationData';
import CauseCard from '../../components/CauseCard';
import OrganizationCard from '../../components/OrganizationCard';

function Home() {
  const [causes, setCauses] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const causeScrollRef = useRef(null);
  const orgScrollRef = useRef(null);

  const getAllTheCauses = () => {
    getCauses().then(setCauses);
  };

  const getAllTheOrganizations = () => {
    getOrganizations().then(setOrganizations);
  };

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  useEffect(() => {
    getAllTheCauses();
    getAllTheOrganizations();
  }, []);

  return (
    <div>
      <div className="org-container">
        <h1 className="text-center mt-3">Popular Causes and Organizations</h1>
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

      {/* Organizations Section */}
      <div style={{ position: 'relative', marginTop: '3rem' }}>
        <h2 className="text-center mt-5">Organizations</h2>
        <Button className="scroll-arrow left" onClick={() => scrollLeft(orgScrollRef)}>
          ‹
        </Button>
        <div ref={orgScrollRef} className="d-flex flex-row px-3" style={{ overflowX: 'auto', scrollBehavior: 'smooth' }}>
          {organizations.map((org) => (
            <OrganizationCard key={org.id} organizationObj={org} onUpdate={getAllTheOrganizations} />
          ))}
        </div>
        <Button className="scroll-arrow right" onClick={() => scrollRight(orgScrollRef)}>
          ›
        </Button>
      </div>
    </div>
  );
}

export default Home;
