'use client';

import firebase from 'firebase/app';
import 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleOrganization, toggleFollowOrganization, checkIfUserFollows } from '../../../api/organizationData';
import { getVolunteersByUid } from '../../../api/volunteerData';

export default function ViewOrganization({ params }) {
  const [orgDetails, setOrgDetails] = useState(null);
  const [volunteerId, setVolunteerId] = useState(null);
  const { id } = params;

  // Get organization details
  useEffect(() => {
    getSingleOrganization(id).then(setOrgDetails);
  }, [id]);

  // Get volunteer by UID
  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user && user.uid) {
      getVolunteersByUid(user.uid).then((volunteerObj) => {
        if (volunteerObj && volunteerObj.id) {
          setVolunteerId(volunteerObj.id);
        } else {
          console.error('❌ No volunteer found for this UID.');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (orgDetails && volunteerId) {
      checkIfUserFollows(volunteerId, orgDetails.id).then((isFollowing) => {
        setOrgDetails((prev) => ({
          ...prev,
          isFollowing,
        }));
      });
    }
  }, [orgDetails, volunteerId]);

  const handleJoinToggle = () => {
    if (!orgDetails || !volunteerId) {
      console.error('Missing organization or volunteer ID');
      return;
    }

    const newFollowState = !orgDetails.isFollowing;

    toggleFollowOrganization(orgDetails.id, orgDetails.isFollowing, volunteerId)
      .then(() => {
        setOrgDetails((prev) => ({
          ...prev,
          isFollowing: newFollowState,
        }));
      })
      .catch((err) => {
        console.error('❌ Toggle failed:', err);
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
        <Button className="me-2" variant={orgDetails.isFollowing ? 'success' : 'primary'} onClick={handleJoinToggle} disabled={!volunteerId}>
          {orgDetails.isFollowing ? 'JOINED' : 'JOIN'}
        </Button>
        <Link href={`/organizations/edit/${orgDetails.id}`} passHref>
          <Button className="me-2" variant="info">
            EDIT
          </Button>
        </Link>
      </div>

      <Link href="/organizations/new" passHref>
        <Button>Add an Organization</Button>
      </Link>
    </div>
  );
}

ViewOrganization.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
