'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function CauseCard({ causeObj }) {
  return (
    <Card style={{ width: '18rem', minWidth: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={causeObj.logo} alt={causeObj.name} style={{ height: '250px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{causeObj.name}</Card.Title>
        <Card.Text>{causeObj.description}</Card.Text>
        <Link href={`/cause/${causeObj.firebaseKey}`} class="stretched-link" passHref>
          <p> </p>
        </Link>
      </Card.Body>
    </Card>
  );
}

CauseCard.propTypes = {
  causeObj: PropTypes.shape({
    logo: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default CauseCard;
