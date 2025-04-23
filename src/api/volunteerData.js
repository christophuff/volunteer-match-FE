import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getVolunteers = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/volunteers`, {
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
          // console.log(data);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const createVolunteer = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/volunteers`, {
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

const deleteVolunteer = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/volunteers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getVolunteersByUid = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/volunteers/uid/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) resolve(data[0] || null);
        else resolve(data);
      })
      .catch(reject);
  });

const createVolunteerIfNotExists = (volunteer) =>
  new Promise((resolve, reject) => {
    getVolunteersByUid(volunteer.uid)
      .then((existing) => {
        console.log('Existing volunteer found:', existing);
        if (Object.keys(existing).length === 0) {
          createVolunteer(volunteer).then(resolve).catch(reject);
        } else {
          resolve(); // still resolve even if they exist
        }
      })
      .catch(reject);
  });

export { getVolunteers, createVolunteer, getVolunteersByUid, createVolunteerIfNotExists, deleteVolunteer };
