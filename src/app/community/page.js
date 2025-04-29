'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getOrganizations } from '../../api/organizationData';
import { getVolunteers } from '../../api/volunteerData';
import OrganizationCard from '../../components/OrganizationCard';
import VolunteerCard from '../../components/VolunteerCard';

export default function ViewCommunity() {
  const [volunteers, setVolunteers] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const volunteerScrollRef = useRef(null);
  const orgScrollRef = useRef(null);

  const getAllTheVolunteers = () => {
    getVolunteers().then(setVolunteers);
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
    getAllTheVolunteers();
    getAllTheOrganizations();
  }, []);

  return (
    <div>
      <div className="org-container">
        <h1 className="text-center mt-3">Meet Other Volunteers Who Share Your Passion</h1>
      </div>

      {/* Volunteers Section */}
      <div style={{ position: 'relative' }}>
        <h2 className="text-center mt-3">Volunteers</h2>
        <Button className="scroll-arrow left" onClick={() => scrollLeft(volunteerScrollRef)}>
          ‹
        </Button>
        <div ref={volunteerScrollRef} className="d-flex flex-row px-3" style={{ overflowX: 'auto', scrollBehavior: 'smooth' }}>
          {volunteers.map((volunteer) => (
            <VolunteerCard key={volunteer.id} volunteerObj={volunteer} onUpdate={getAllTheVolunteers} />
          ))}
        </div>
        <Button className="scroll-arrow right" onClick={() => scrollRight(volunteerScrollRef)}>
          ›
        </Button>
      </div>

      <br />

      {/* Organizations Section */}
      <div className="org-container">
        <h1 className="text-center mt-3">Find Organizations That Support Your Causes</h1>
      </div>
      <div style={{ position: 'relative', marginTop: '3rem' }}>
        <h2 className="text-center mt-5">Organizations</h2>
        <Button className="scroll-arrow left" onClick={() => scrollLeft(orgScrollRef)}>
          ‹
        </Button>
        <div ref={orgScrollRef} className="d-flex flex-row px-3" style={{ overflowX: 'auto', scrollBehavior: 'smooth' }}>
          {organizations.map((organization) => (
            <OrganizationCard key={organization.id} organizationObj={organization} onUpdate={getAllTheOrganizations} />
          ))}
        </div>
        <Button className="scroll-arrow right" onClick={() => scrollRight(orgScrollRef)}>
          ›
        </Button>
      </div>
    </div>
  );
}
