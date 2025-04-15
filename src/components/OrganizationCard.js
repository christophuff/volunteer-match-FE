'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function OrganizationCard({ organizationObj }) {
  return (
    <Card style={{ width: '18rem', minWidth: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={organizationObj.image} alt={organizationObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{organizationObj.name}</Card.Title>
        <Card.Text>{organizationObj.description}</Card.Text>
        <Link href={`/cause/${organizationObj.firebaseKey}`} class="stretched-link" passHref>
          <p> </p>
        </Link>
      </Card.Body>
    </Card>
  );
}

OrganizationCard.propTypes = {
  organizationObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default OrganizationCard;
