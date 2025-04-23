// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { firebase } from '@/utils/client';
import { createVolunteerIfNotExists } from '@/api/volunteerData';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        const volunteer = {
          uid: fbUser.uid,
          firstName: fbUser.displayName?.split(' ')[0] || '',
          lastName: fbUser.displayName?.split(' ')[1] || '',
          email: fbUser.email,
          imageUrl: fbUser.photoURL,
        };

        console.log('Sending volunteer:', volunteer);
        // Ensure this is awaited to avoid race conditions
        createVolunteerIfNotExists(volunteer);

        setUser(fbUser); // only set after volunteer is handled
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null,
    }),
    [user],
  );

  return <AuthContext.Provider value={value} {...props} />;
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
