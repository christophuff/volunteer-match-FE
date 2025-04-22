'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function VolunteerCard({ volunteerObj }) {
  return (
    <Card style={{ width: '18rem', minWidth: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={volunteerObj?.imageUrl} alt={volunteerObj?.first_name} style={{ height: '250px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>
          {volunteerObj?.first_name} {volunteerObj?.last_name}
        </Card.Title>
        <Link href={`/volunteer/${volunteerObj?.id}`} className="stretched-link" passHref />
      </Card.Body>
    </Card>
  );
}

VolunteerCard.propTypes = {
  volunteerObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default VolunteerCard;
