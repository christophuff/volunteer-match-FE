'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

function EditProfileForm({ currentBio, onSave, onCancel }) {
  const [bioInput, setBioInput] = useState(currentBio || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(bioInput);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2" controlId="bioTextarea">
        <Form.Control as="textarea" rows={3} placeholder="Write a short bio..." value={bioInput} onChange={(e) => setBioInput(e.target.value)} />
      </Form.Group>
      <Button type="submit" size="sm" className="me-2">
        Save Bio
      </Button>
      <Button variant="secondary" size="sm" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
}

EditProfileForm.propTypes = {
  currentBio: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditProfileForm;
