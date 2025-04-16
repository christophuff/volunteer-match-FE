import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrganizations = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations.json`, {
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
    fetch(`${endpoint}/organizations.json`, {
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

const getOrganizationsByCause = (causeFirebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/organizations.json?orderBy="cause_id"&equalTo="${causeFirebaseKey}"`, {
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

export { getOrganizations, createOrganization, getOrganizationsByCause };
