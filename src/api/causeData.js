import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCauses = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/causes.json`, {
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

const createCauses = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/causes.json`, {
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

export { getCauses, createCauses };
