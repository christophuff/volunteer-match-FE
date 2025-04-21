'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function OrganizationCard({ organizationObj }) {
  return (
    <Card style={{ width: '18rem', minWidth: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={organizationObj.imageURL} alt={organizationObj.name} style={{ height: '250px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{organizationObj.name}</Card.Title>
        <Card.Text>{organizationObj.description}</Card.Text>
        <Link href={`/organizations/${organizationObj.id}`} className="stretched-link" passHref />
      </Card.Body>
    </Card>
  );
}

OrganizationCard.propTypes = {
  organizationObj: PropTypes.shape({
    imageURL: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default OrganizationCard;
