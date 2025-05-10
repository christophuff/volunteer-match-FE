import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const checkIfUserFollows = (followerId, followingId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/volunteerfollowers/check?followerId=${followerId}&followingId=${followingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(data.isFollowing);
        } else {
          resolve(false); // Default to false if no data is returned
        }
      })
      .catch(reject);
  });

const followVolunteer = (followerId, followedId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/volunteerfollowers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followerId,
        followedId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject(new Error('Error following volunteer'));
        }
      })
      .catch(() => reject(new Error('Error following volunteer')));
  });

const unfollowVolunteer = (followerId, followedId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/volunteerfollowers/${followerId}/${followedId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          reject(new Error('Error unfollowing volunteer'));
        }
      })
      .catch(() => reject(new Error('Error unfollowing volunteer')));
  });

// const getFollowedVolunteers = (volunteerId) =>
//   new Promise((resolve, reject) => {
//     if (!volunteerId) {
//       reject(new Error('Missing volunteer ID'));
//       return;
//     }

//     fetch(`${endpoint}/volunteers/${volunteerId}/followed-organizations`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         return res.json();
//       })
//       .then((data) => resolve(data || []))
//       .catch(reject);
//   });

export { checkIfUserFollows, followVolunteer, unfollowVolunteer };
