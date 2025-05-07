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

export { checkIfUserFollows, followVolunteer, unfollowVolunteer };
