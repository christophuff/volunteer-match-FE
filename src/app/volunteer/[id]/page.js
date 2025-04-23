'use client';

import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getFollowedOrganizations } from '@/api/organizationData';
import { getVolunteerById } from '@/api/volunteerData';

function VolunteerProfile() {
  const [volunteer, setVolunteer] = useState(null);
  const [followedOrganizations, setFollowedOrganizations] = useState([]);

  const { id } = useParams(); // assumes you're using /volunteer/:id route

  useEffect(() => {
    if (id) {
      getVolunteerById(Number(id)).then((v) => {
        setVolunteer(v);
        if (v?.id) {
          getFollowedOrganizations(v.id).then(setFollowedOrganizations);
        }
      });
    }
  }, [id]);

  if (!volunteer) return <p>Loading volunteer profile...</p>;

  return (
    <>
      <div className="profile-container d-flex gap-4 align-items-start">
        <div>
          <Image src={volunteer.imageUrl || '/default-avatar.png'} alt="Volunteer" width={150} height={150} style={{ objectFit: 'cover' }} />
        </div>

        <div>
          <h3>
            {volunteer.firstName} {volunteer.lastName}
          </h3>
          <p>
            <a href={`mailto:${volunteer.email}`}>{volunteer.email}</a>
          </p>
          {volunteer.bio ? <p>{volunteer.bio}</p> : <p className="text-muted fst-italic">This user hasn’t added a bio yet.</p>}
        </div>
      </div>

      <div className="text-center followed-orgs mt-5">
        <h4>Organizations They’ve Joined</h4>
        {followedOrganizations.length === 0 ? (
          <p className="text-muted fst-italic">This user hasn’t joined any organizations yet.</p>
        ) : (
          <ul className="list-group">
            {followedOrganizations.map((org) => (
              <li key={org.id} className="list-group-item">
                <Link href={`/organizations/${org.id}`} passHref>
                  <span style={{ cursor: 'pointer', color: '#0d6efd', textDecoration: 'underline' }}>{org.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default VolunteerProfile;
