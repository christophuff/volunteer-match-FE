'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
import { getOrganizationsByCause } from '../../../api/organizationData';
import OrganizationCard from '../../../components/OrganizationCard';
import { viewCauseDetails } from '../../../api/causeData';

export default function ViewCause({ params }) {
  const [causeDetails, setCauseDetails] = useState({});
  const [organizations, setOrganizations] = useState([]);

  const { firebaseKey } = params;

  const getCauseDetails = () => {
    viewCauseDetails(firebaseKey).then(setCauseDetails);
  };

  const getAllTheOrganizations = () => {
    getOrganizationsByCause(firebaseKey).then(setOrganizations);
  };

  useEffect(() => {
    getAllTheOrganizations();
    getCauseDetails();
  }, []);

  return (
    <div>
      <div>
        <h1>{causeDetails.name}</h1>
      </div>
      <div>
        <img className="fit-picture" src={causeDetails.logo} width={500} height={500} alt="" />
      </div>
      <h3>Associated Organizations</h3>
      <div className="d-flex flex-row" style={{ overflow: 'auto' }}>
        {organizations.map((organization) => (
          <OrganizationCard key={organization.firebaseKey} organizationObj={organization} onUpdate={getAllTheOrganizations} />
        ))}
      </div>
    </div>
  );
}

ViewCause.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
