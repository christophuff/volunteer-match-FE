'use client';

import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleOrganization, toggleFollowOrganization } from '../../../api/organizationData';

export default function ViewOrganization({ params }) {
  const [orgDetails, setOrgDetails] = useState(null);
  const { id } = params;

  useEffect(() => {
    getSingleOrganization(id).then(setOrgDetails);
  }, [id]);

  const handleJoinToggle = () => {
    const updatedFollowStatus = !orgDetails.isFollowing;

    toggleFollowOrganization(orgDetails.id, orgDetails.isFollowing).then(() => {
      setOrgDetails((prev) => ({
        ...prev,
        isFollowing: updatedFollowStatus,
      }));
    });
  };

  if (!orgDetails) return <p>Loading...</p>;

  return (
    <div className="org-container">
      {/* Organization Image */}
      <div>{orgDetails.imageURL && <Image src={orgDetails.imageURL} alt={orgDetails.name || 'Organization'} width={400} height={300} style={{ objectFit: 'cover' }} />}</div>

      {/* Organization Details */}
      <div>
        <h5>{orgDetails.name}</h5>
        <p>{orgDetails.description || ''}</p>
        <hr />
        <Button variant={orgDetails.isFollowing ? 'success' : 'primary'} onClick={handleJoinToggle}>
          {orgDetails.isFollowing ? 'JOINED' : 'JOIN'}
        </Button>
      </div>
    </div>
  );
}

ViewOrganization.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
