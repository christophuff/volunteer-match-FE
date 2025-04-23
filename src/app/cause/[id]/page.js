'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getOrganizationsByCause } from '../../../api/organizationData';
import OrganizationCard from '../../../components/OrganizationCard';
import { viewCauseDetails } from '../../../api/causeData';

export default function ViewCause({ params }) {
  const [causeDetails, setCauseDetails] = useState({});
  const [organizations, setOrganizations] = useState([]);

  const { id } = params;

  const getCauseDetails = () => {
    viewCauseDetails(id).then(setCauseDetails);
  };

  const getFilteredOrganizations = () => {
    getOrganizationsByCause(id).then(setOrganizations);
  };

  useEffect(() => {
    getFilteredOrganizations();
    getCauseDetails();
  }, []);

  return (
    <div>
      <div className="org-container">
        {/* Cause Image */}
        <div>{causeDetails.imageUrl && <Image src={causeDetails.imageUrl} alt={causeDetails.name || 'Cause'} width={400} height={300} style={{ objectFit: 'cover' }} />}</div>

        {/* Cause Details */}
        <div>
          <h1>{causeDetails.name}</h1>
          <p>{causeDetails.description || ''}</p>
        </div>
      </div>

      {/* Organization Info */}
      <h3 className="text-center mt-3">Associated Organizations</h3>
      <div className="d-flex flex-row" style={{ overflow: 'auto' }}>
        {organizations.map((organization) => (
          <OrganizationCard key={organization.id} organizationObj={organization} onUpdate={getFilteredOrganizations} />
        ))}
      </div>
    </div>
  );
}

ViewCause.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
