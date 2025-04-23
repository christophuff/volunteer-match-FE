'use client';

import React, { useEffect, useState } from 'react';
import { getCauses } from '../api/causeData';
import CauseCard from '../components/CauseCard';
import { getOrganizations } from '../api/organizationData';
import OrganizationCard from '../components/OrganizationCard';

function Home() {
  const [causes, setCauses] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const getAllTheCauses = () => {
    getCauses().then(setCauses);
  };

  const getAllTheOrganizations = () => {
    getOrganizations().then(setOrganizations);
  };

  useEffect(() => {
    getAllTheCauses();
    getAllTheOrganizations();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-center mt-3">Popular Causes and Organizations</h1>
      </div>
      <div id="causes">
        <h3 className="text-center mt-3">Causes</h3>
        <div className="d-flex flex-row" style={{ overflow: 'auto' }}>
          {causes.map((cause) => (
            <CauseCard key={cause.Id} causeObj={cause} onUpdate={getAllTheCauses} />
          ))}
        </div>
        <h3 className="text-center mt-5">Organizations</h3>
        <div className="d-flex flex-row" style={{ overflow: 'auto' }}>
          {organizations.map((organization) => (
            <OrganizationCard key={organization.Id} organizationObj={organization} onUpdate={getAllTheOrganizations} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
