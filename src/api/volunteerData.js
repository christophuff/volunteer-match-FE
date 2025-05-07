import firebase from 'firebase';
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
        Accept: 'application/json',
      },
    }).then((response) =>
      response
        .text()
        .then((text) => (text ? JSON.parse(text) : null))
        .then((data) => resolve(data))
        .catch(reject),
    );
  });

const getVolunteerById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/volunteers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then(resolve)
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
      .then((response) => response.text())
      .then((text) => {
        if (!text) {
          resolve(null); // no content, treat as not found
        } else {
          const data = JSON.parse(text);
          if (Array.isArray(data)) resolve(data[0] || null);
          else resolve(data);
        }
      })
      .catch(reject);
  });

const fetchVolunteerId = (uid) =>
  new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    if (user) {
      fetch(`${endpoint}/volunteers/uid/${uid}`, {
        method: 'GET', // Change method to GET
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(reject);
    }
  });

const getVolunteersByOrganization = (organizationId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations/${organizationId}/volunteers`, {
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

const createVolunteerIfNotExists = (volunteer) =>
  new Promise((resolve, reject) => {
    getVolunteersByUid(volunteer.uid)
      .then((existing) => {
        console.log('Existing volunteer found:', existing);

        if (!existing || Object.keys(existing).length === 0) {
          // No volunteer found, create one
          createVolunteer(volunteer).then(resolve).catch(reject);
        } else {
          // Already exists
          resolve();
        }
      })
      .catch(reject);
  });

export { getVolunteers, createVolunteer, getVolunteerById, getVolunteersByUid, fetchVolunteerId, getVolunteersByOrganization, createVolunteerIfNotExists, deleteVolunteer };
