import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCauses = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/causes`, {
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

const createCauses = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/causes`, {
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

const viewCauseDetails = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/causes/${id}`, {
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

export { getCauses, createCauses, viewCauseDetails };
