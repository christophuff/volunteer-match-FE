'use client';

import firebase from 'firebase/app';
import 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleOrganization, toggleFollowOrganization, checkIfUserFollows } from '../../../api/organizationData';
import { getVolunteersByOrganization, getVolunteersByUid } from '../../../api/volunteerData';

export default function ViewOrganization({ params }) {
  const [orgDetails, setOrgDetails] = useState(null);
  const [volunteerId, setVolunteerId] = useState(null);
  const [followers, setFollowers] = useState([]);
  const { id } = params;

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

  // Get organization details and check if user follows
  useEffect(() => {
    if (id && volunteerId) {
      getSingleOrganization(id).then((org) => {
        checkIfUserFollows(volunteerId, org.id).then((isFollowing) => {
          setOrgDetails({ ...org, isFollowing });
        });
      });
    }
  }, [id, volunteerId]);

  // Fetch followers
  useEffect(() => {
    if (orgDetails?.id) {
      getVolunteersByOrganization(orgDetails.id).then(setFollowers);
    }
  }, [orgDetails]);

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
        // Refresh followers list
        fetch(`/organizations/${orgDetails.id}/volunteers`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then(setFollowers)
          .catch((err) => console.error('Error fetching followers:', err));
      })
      .catch((err) => {
        console.error('❌ Toggle failed:', err);
      });
  };

  if (!orgDetails) return <p>Loading...</p>;

  return (
    <>
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
          <Link href="/organizations/new" passHref>
            <Button>Add an Organization</Button>
          </Link>
        </div>
      </div>

      {/* Followers List */}
      <div>
        <h4 className="text-center mt-5" style={{ color: '#A1683A' }}>
          Volunteers
        </h4>
        <ul className="follower-card">
          {followers.map((volunteer) => (
            <li key={volunteer.id} className="list-group-item">
              <Image src={volunteer.imageUrl} alt="Volunteer" width={50} height={50} style={{ objectFit: 'cover', borderRadius: '50%' }} />
              <Link href={`/volunteer/${volunteer.id}`}>
                {volunteer.firstName} {volunteer.lastName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

ViewOrganization.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
