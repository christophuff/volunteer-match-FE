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

const toggleFollowOrganization = (id, currentValue) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ isFollowing: !currentValue }),
    })
      .then(async (response) => {
        console.log('🔍 Response status:', response.status);
        if (!response.ok) throw new Error('Failed to toggle follow status');
        try {
          return await response.json();
        } catch {
          return null;
        }
      })
      .then(resolve)
      .catch(reject);
  });

const getFollowedOrganizations = () =>
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
        const followed = Object.values(data).filter((item) => item.isFollowing);
        resolve(followed);
      })
      .catch(reject);
  });

export { getOrganizations, createOrganization, getOrganizationsByCause, getSingleOrganization, toggleFollowOrganization, getFollowedOrganizations };
