'use client';

import React, { useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { Image, Button } from 'react-bootstrap';
import EditProfileForm from '@/components/forms/EditProfileForm';

function Profile() {
  const { user } = useAuth();
  const [bio, setBio] = useState('');
  const [editing, setEditing] = useState(false);

  const handleSaveBio = (newBio) => {
    setBio(newBio);
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <div>
        <Image
          src={user.photoURL}
          alt="User"
          // className="rounded-circle"
          width={150}
          height={150}
        />
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
  );
}

export default Profile;
