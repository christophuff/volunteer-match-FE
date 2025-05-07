'use client';

import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getFollowedOrganizations } from '@/api/organizationData';
import { getVolunteerById, fetchVolunteerId } from '@/api/volunteerData';
import { checkIfUserFollows, followVolunteer, unfollowVolunteer } from '@/api/volunteerFollowData';
import firebase from 'firebase';

function VolunteerProfile() {
  const [volunteer, setVolunteer] = useState(null);
  const [followedOrganizations, setFollowedOrganizations] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { id } = useParams();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Fetch currentUserId once the component mounts
    const getCurrentUserId = async () => {
      try {
        const volunteerId = await fetchVolunteerId(firebase.auth().currentUser.uid);
        setCurrentUserId(volunteerId.volunteerId); // Assuming response has a volunteerId field
      } catch (error) {
        console.error('Error fetching current user volunteer ID:', error);
      }
    };
    getCurrentUserId();
  }, []);

  useEffect(() => {
    if (id && currentUserId !== null) {
      getVolunteerById(Number(id)).then((v) => {
        setVolunteer(v);
        if (v?.id) {
          getFollowedOrganizations(v.id).then(setFollowedOrganizations);
          // Check if the current user follows this volunteer
          checkIfUserFollows(currentUserId, v.id).then(setIsFollowing);
        }
      });
    }
  }, [currentUserId, id]);

  // Function to handle follow/unfollow toggle
  const handleFollowToggle = () => {
    // Prevent the user from following themselves
    if (currentUserId === volunteer.id) {
      alert('You cannot follow yourself.');
      return; // Exit early, don't perform the follow/unfollow action
    }

    if (isFollowing) {
      unfollowVolunteer(currentUserId, volunteer.id)
        .then(() => setIsFollowing(false))
        .catch((error) => console.error('Error unfollowing:', error));
    } else {
      followVolunteer(currentUserId, volunteer.id)
        .then(() => setIsFollowing(true))
        .catch((error) => console.error('Error following:', error));
    }
  };

  if (!volunteer) return <p>Loading volunteer profile...</p>;

  return (
    <>
      <div className="profile-container d-flex gap-4 align-items-start">
        <div>
          <Image src={volunteer.imageUrl || '/default-avatar.png'} alt="Volunteer" width={150} height={150} style={{ objectFit: 'cover' }} />
        </div>

        <div>
          <h3>
            {volunteer.firstName} {volunteer.lastName}
          </h3>
          <p>
            <a href={`mailto:${volunteer.email}`}>{volunteer.email}</a>
          </p>
          {volunteer.bio ? <p>{volunteer.bio}</p> : <p className="text-muted fst-italic">This user hasn’t added a bio yet.</p>}
          <Button variant={isFollowing ? 'success' : 'primary'} onClick={handleFollowToggle}>
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
      </div>

      <div className="text-center followed-orgs mt-5">
        <h4>Organizations They’ve Joined</h4>
        {followedOrganizations.length === 0 ? (
          <p className="text-muted fst-italic">This user hasn’t joined any organizations yet.</p>
        ) : (
          <ul className="list-group">
            {followedOrganizations.map((org) => (
              <li key={org.id} className="list-group-item">
                <Link href={`/organizations/${org.id}`} passHref>
                  <span style={{ cursor: 'pointer', color: '#0d6efd', textDecoration: 'underline' }}>{org.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default VolunteerProfile;
