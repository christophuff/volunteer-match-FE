'use client';

import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Image, Button } from 'react-bootstrap';
import Link from 'next/link';
import EditProfileForm from '@/components/forms/EditProfileForm';
import { getFollowedOrganizations } from '../../api/organizationData';
import { getVolunteersByUid } from '../../api/volunteerData';

function Profile() {
  const [bio, setBio] = useState('');
  const [editing, setEditing] = useState(false);
  const [followedOrganizations, setFollowedOrganizations] = useState([]);

  const user = firebase.auth().currentUser;

  useEffect(() => {
    if (user && user.uid) {
      getVolunteersByUid(user.uid).then((volunteer) => {
        if (volunteer?.id) {
          getFollowedOrganizations(volunteer.id).then(setFollowedOrganizations);
        }
      });
    }
  }, [user]);

  const handleSaveBio = (newBio) => {
    setBio(newBio);
    setEditing(false);
  };

  return (
    <>
      <div className="profile-container">
        <div>
          <Image src={user.photoURL} alt="User" width={150} height={150} />
        </div>
        <div>
          <h3>{user.displayName}</h3>
          <p>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>

          {editing ? (
            <EditProfileForm currentBio={bio} onSave={handleSaveBio} onCancel={() => setEditing(false)} />
          ) : (
            <>
              {bio ? <p>{bio}</p> : <p className="text-muted fst-italic">No bio added yet.</p>}
              <Button size="sm" className="mt-2" onClick={() => setEditing(true)}>
                {bio ? 'Edit Bio' : 'Add Bio'}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="text-center followed-orgs">
        <h4>Followed Organizations</h4>
        <ul className="list-group">
          {followedOrganizations.map((org) => (
            <li key={org.id} className="list-group-item">
              <Link href={`/organizations/${org.id}`} passHref>
                <span style={{ cursor: 'pointer', color: '#0d6efd', textDecoration: 'underline' }}>{org.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Profile;
