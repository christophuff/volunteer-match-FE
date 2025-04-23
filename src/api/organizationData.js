import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrganizations = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateOrganization = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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
      },
      body: JSON.stringify({ isFollowing: !currentValue }),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getFollowedOrganizations = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

export { getOrganizations, createOrganization, getOrganizationsByCause, getSingleOrganization, toggleFollowOrganization, getFollowedOrganizations, deleteOrganization, updateOrganization };
