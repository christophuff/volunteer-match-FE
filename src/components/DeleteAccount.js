'use client';

import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import { Button } from 'react-bootstrap';
import { getVolunteersByUid, deleteVolunteer } from '../api/volunteerData';
import { signOut } from '../utils/auth';

export default function DeleteAccount() {
  const handleDelete = () => {
    const user = firebase.auth().currentUser;

    if (!user) {
      console.error('No user is currently signed in.');
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete your account (${user.displayName})?    This action cannot be undone.`);

    if (!confirmDelete) return;

    getVolunteersByUid(user.uid)
      .then((volunteer) => {
        if (volunteer?.id) {
          return deleteVolunteer(volunteer.id);
        }
        throw new Error('Volunteer not found.');
      })
      .then(() => user.delete())
      .then(() => signOut())
      .catch((error) => {
        if (error.code === 'auth/requires-recent-login') {
          alert('Please signout and try again.');
          // Optionally, redirect to login page or prompt re-authentication
        } else {
          console.error('Error deleting account:', error);
        }
      });
  };

  return (
    <Button className="m-2" variant="danger" onClick={handleDelete}>
      Delete Account
    </Button>
  );
}
