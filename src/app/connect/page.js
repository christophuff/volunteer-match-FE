'use client';

import React, { useEffect, useState } from 'react';
import { getOrganizations } from '../../api/organizationData';
import OrganizationCard from '../../components/OrganizationCard';
import { getVolunteers } from '../../api/volunteerData';
import VolunteerCard from '../../components/VolunteerCard';

function Home() {
  const [volunteers, setVolunteers] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const getAllTheVolunteers = () => {
    getVolunteers().then(setVolunteers);
  };

  const getAllTheOrganizations = () => {
    getOrganizations().then(setOrganizations);
  };

  useEffect(() => {
    getAllTheVolunteers();
    getAllTheOrganizations();
  }, []);

  return (
    <div>
      <div className="org-container">
        <h1 className="text-center mt-3">Connect with Volunteers and Organizations</h1>
      </div>
      <div>
        <div style={{ color: '#000000' }}>
          <h2 className="text-center mt-3">Volunteers</h2>
        </div>
        <div className="d-flex flex-row" style={{ overflow: 'auto' }}>
          {volunteers.map((volunteer) => (
            <VolunteerCard key={volunteer.firebaseKey} causeObj={volunteer} onUpdate={getAllTheVolunteers} />
          ))}
        </div>
        <div style={{ color: '#000000' }}>
          <h2 className="text-center mt-5">Organizations</h2>
        </div>
        <div className="d-flex flex-row" style={{ overflow: 'auto' }}>
          {organizations.map((organization) => (
            <OrganizationCard key={organization.firebaseKey} organizationObj={organization} onUpdate={getAllTheOrganizations} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
