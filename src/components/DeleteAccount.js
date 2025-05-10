'use client';

import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { fetchVolunteerId, deleteVolunteer } from '../api/volunteerData';
import { signOut } from '../utils/auth';

export default function DeleteAccount() {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    const user = firebase.auth().currentUser;

    if (!user) {
      console.error('No user is currently signed in.');
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete your account (${user.displayName})? This action cannot be undone.`);

    if (!confirmDelete) return;

    setIsDeleting(true); // Set loading state to true

    // Use the new fetchVolunteerId to get the volunteer ID
    fetchVolunteerId(user.uid)
      .then((volunteerId) => {
        if (volunteerId) {
          return deleteVolunteer(volunteerId);
        }
        throw new Error('Volunteer not found.');
      })
      .then(() => user.delete()) // Delete the Firebase user account
      .then(() => signOut()) // Sign the user out
      .catch((error) => {
        if (error.code === 'auth/requires-recent-login') {
          alert('Please sign out and try again.');
          // Optionally, redirect to login page or prompt re-authentication
        } else {
          console.error('Error deleting account:', error);
        }
      })
      .finally(() => setIsDeleting(false)); // Reset loading state after process finishes
  };

  return (
    <Button
      className="m-2"
      variant="danger"
      onClick={handleDelete}
      disabled={isDeleting} // Disable the button while deleting
    >
      {isDeleting ? <Spinner animation="border" size="sm" /> : 'Delete Account'}
    </Button>
  );
}
