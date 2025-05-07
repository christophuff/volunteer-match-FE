'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getOrganizations } from '../../api/organizationData';
import { getVolunteers } from '../../api/volunteerData';
import { getCauses } from '../../api/causeData';
import OrganizationCard from '../../components/OrganizationCard';
import VolunteerCard from '../../components/VolunteerCard';

export default function ViewConnect() {
  const [volunteers, setVolunteers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [causes, setCauses] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [allOrgCheck, setAllOrgCheck] = useState(true);

  const volunteerScrollRef = useRef(null);
  const orgScrollRef = useRef(null);

  const getAllTheVolunteers = () => {
    getVolunteers().then(setVolunteers);
  };

  const getAllTheOrganizations = () => {
    getOrganizations().then(setOrganizations);
  };

  const getAllTheCauses = () => {
    getCauses().then(setCauses);
  };

  const filterByCause = (id) => {
    const filteredOrgs = [];
    organizations.forEach((org) =>
      org.organizationCauses.forEach((cause) => {
        if (cause.causeId === id) {
          filteredOrgs.push(org);
        }
      }),
    );
    return filteredOrgs;
  };

  const filterOrganizations = (id) => {
    if (id === 'all') {
      setAllOrgCheck(true);
    } else {
      setAllOrgCheck(false);
      const numId = Number(id);
      // console.log(organizations)
      setFilteredOrganizations(filterByCause(numId));
      // setFilteredOrganizations(organizations.filter((organization) => organization.causeId === numId));
    }
  };

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  useEffect(() => {
    getAllTheVolunteers();
    getAllTheOrganizations();
    getAllTheCauses();
  }, []);

  return (
    <div>
      <div className="org-container">
        <h1 className="text-center mt-3">Connect with Volunteers and Organizations</h1>
      </div>

      {/* Volunteers Section */}
      <div style={{ position: 'relative' }}>
        <h2 className="text-center mt-3">Volunteers</h2>
        <Button className="scroll-arrow left" onClick={() => scrollLeft(volunteerScrollRef)}>
          ‹
        </Button>
        <div ref={volunteerScrollRef} className="d-flex flex-row px-3" style={{ overflowX: 'auto', scrollBehavior: 'smooth' }}>
          {volunteers.map((volunteer) => (
            <VolunteerCard key={volunteer.id} volunteerObj={volunteer} onUpdate={getAllTheVolunteers} />
          ))}
        </div>
        <Button className="scroll-arrow right" onClick={() => scrollRight(volunteerScrollRef)}>
          ›
        </Button>
      </div>

      {/* Organizations Section */}
      <div style={{ position: 'relative', marginTop: '3rem' }}>
        <div className="d-flex flex-column align-content-center" style={{ marginBottom: '1rem' }}>
          <h2 className="text-center mt-2">Organizations</h2>
          <label className="text-center">
            Filter By Cause:
            <select
              defaultValue="all"
              onChange={(e) => {
                filterOrganizations(e.target.value);
              }}
            >
              <option key="all" value="all">
                All
              </option>
              {causes.map((cause) => (
                <option key={cause.id} value={cause.id}>
                  {cause.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <Button className="scroll-arrow left" onClick={() => scrollLeft(orgScrollRef)}>
          ‹
        </Button>
        <div ref={orgScrollRef} className="d-flex flex-row px-3" style={{ overflowX: 'auto', scrollBehavior: 'smooth' }}>
          {allOrgCheck ? organizations.map((organization) => <OrganizationCard key={organization.id} organizationObj={organization} onUpdate={getAllTheOrganizations} />) : filteredOrganizations.map((organization) => <OrganizationCard key={organization.id} organizationObj={organization} onUpdate={getAllTheOrganizations} />)}
        </div>
        <Button className="scroll-arrow right" onClick={() => scrollRight(orgScrollRef)}>
          ›
        </Button>
      </div>
    </div>
  );
}
