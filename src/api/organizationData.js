import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrganizations = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const createOrganization = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteOrganization = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateOrganization = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      // .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleOrganization = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getOrganizationsByCause = (causeId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations?causeId=${causeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const toggleFollowOrganization = (organizationId, isCurrentlyFollowing, volunteerId) =>
  new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    if (!user || !volunteerId) {
      reject(new Error('Missing user or volunteer ID'));
      return;
    }

    console.log('🚀 toggleFollowOrganization: Payload:', {
      volunteerId,
      organizationId,
      isCurrentlyFollowing,
    });

    user
      .getIdToken()
      .then((idToken) => {
        const headers = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${idToken}`,
        };

        const url = isCurrentlyFollowing ? `${endpoint}/organizationfollowers/${volunteerId}/${organizationId}` : `${endpoint}/organizationfollowers`;

        const options = isCurrentlyFollowing
          ? { method: 'DELETE', headers }
          : {
              method: 'POST',
              headers,
              body: JSON.stringify({ volunteerId, organizationId }),
            };

        return fetch(url, options);
      })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to toggle follow');
        resolve({ success: true });
      })
      .catch((err) => {
        console.error('🔥 toggleFollowOrganization error:', err);
        reject(err);
      });
  });

const getFollowedOrganizations = (volunteerId) =>
  new Promise((resolve, reject) => {
    if (!volunteerId) {
      reject(new Error('Missing volunteer ID'));
      return;
    }

    fetch(`${endpoint}/volunteers/${volunteerId}/followed-organizations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => resolve(data || []))
      .catch(reject);
  });

const checkIfUserFollows = (volunteerId, organizationId) =>
  new Promise((resolve, reject) => {
    if (!volunteerId || !organizationId) {
      reject(new Error('Missing IDs for follow check'));
      return;
    }

    fetch(`${endpoint}/organizationfollowers/check?volunteerId=${volunteerId}&organizationId=${organizationId}`)
      .then((res) => res.json())
      .then((data) => resolve(data?.isFollowing || false))
      .catch((err) => {
        console.error('❌ Failed to check follow status:', err);
        resolve(false); // fail gracefully
      });
  });

export { getOrganizations, createOrganization, getOrganizationsByCause, getSingleOrganization, toggleFollowOrganization, getFollowedOrganizations, deleteOrganization, updateOrganization, checkIfUserFollows };
