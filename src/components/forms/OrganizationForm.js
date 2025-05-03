'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateOrganization, createOrganization } from '../../api/organizationData';
import { getCauses } from '../../api/causeData';
import { getVolunteersByUid } from '../../api/volunteerData';

const initialState = {
  name: '',
  imageURL: '',
  description: '',
  location: '',
  causeId: [], // Initialize as an empty array to hold selected causes
  isFollowing: false,
};

function OrganizationForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [causes, setCauses] = useState([]);
  const [volunteer, setVolunteer] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getVolunteersByUid(user.uid).then(setVolunteer);
    getCauses().then(setCauses);

    if (obj && obj.id) {
      setFormInput((prevState) => ({
        ...prevState,
        name: obj.name,
        imageURL: obj.imageURL,
        description: obj.description,
        location: obj.location,
        causeId:
          Array.isArray(obj.organizationCauses) && obj.organizationCauses.length > 0
            ? obj.organizationCauses.map((cause) => cause.id) // Set causeId based on organizationCauses
            : [], // If organizationCauses is empty, initialize causeId as an empty array
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        causeId: [], // Initialize as empty array for a new organization
      }));
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;
    if (name === 'causeId') {
      const selectedCauses = Array.from(selectedOptions, (option) => parseInt(option.value, 10));
      setFormInput((prevState) => ({
        ...prevState,
        causeId: selectedCauses, // Update causeId to be an array of selected cause IDs
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Function to handle adding/removing a cause (tag)
  const toggleCause = (causeId) => {
    setFormInput((prevState) => {
      const isSelected = prevState.causeId.includes(causeId);
      const newCauseIds = isSelected
        ? prevState.causeId.filter((id) => id !== causeId) // Remove cause
        : [...prevState.causeId, causeId]; // Add cause

      return { ...prevState, causeId: newCauseIds }; // Update causeId state
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct payload with only CauseIds, not causeId
    const CauseIds = formInput.causeId.filter((id) => typeof id === 'number'); // Filter out any non-numeric values

    if (CauseIds.length === 0) {
      console.error('Invalid CauseIds:', CauseIds);
      return; // Prevent submission if CauseIds is invalid or empty
    }

    // Construct the payload with CauseIds and ensure obj.id is included
    const payload = {
      ...formInput,
      volunteerId: volunteer.id,
      CauseIds, // Use the filtered CauseIds
      id: obj.id, // Explicitly include obj.id
    };
    // Submit the payload
    if (obj.id) {
      updateOrganization(payload)
        .then(() => router.push(`/organizations/${obj.id}`)) // Redirect to the updated organization
        .catch((error) => console.error('Error updating organization:', error));
    } else {
      createOrganization(payload)
        .then(() => router.push('/')) // Redirect to the home page or other location
        .catch((error) => console.error('Error creating organization:', error));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black" style={{ width: '95%', margin: '0 auto' }}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Organization</h2>

      {/* ORGANIZATION NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Organization Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter organization name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Description" className="mb-3">
        <Form.Control type="text" placeholder="Enter description of organization" name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Organization Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="imageURL" value={formInput.imageURL} onChange={handleChange} required />
      </FloatingLabel>

      {/* LOCATION INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Organization Location" className="mb-3">
        <Form.Control type="text" placeholder="Organization's Location" name="location" value={formInput.location} onChange={handleChange} required />
      </FloatingLabel>

      {/* CAUSE SELECT (Clickable Causes) */}
      <div className="mb-3">
        <h5>Select Causes</h5>
        {causes.map((cause) => (
          <Button key={cause.id} variant={formInput.causeId.includes(cause.id) ? 'success' : 'outline-success'} className="me-2" onClick={() => toggleCause(cause.id)}>
            {cause.name}
          </Button>
        ))}
      </div>

      {/* Display selected causes as tags */}
      <div className="mb-3">
        {/* Only render if causeId is an array and has a length */}
        {Array.isArray(formInput.causeId) && formInput.causeId.length > 0 && (
          <div className="selected-causes">
            {formInput.causeId.map((causeId) => {
              const cause = causes.find((causeTag) => causeTag.id === causeId);
              return (
                cause && (
                  <span key={cause.id} className="badge badge-pill badge-info me-2 text-black">
                    {cause.name}
                    <Button type="button" className="btn-close btn-close-black ms-2" onClick={() => toggleCause(cause.id)} aria-label="Remove" />
                  </span>
                )
              );
            })}
          </div>
        )}
      </div>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Organization</Button>
    </Form>
  );
}

OrganizationForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    imageURL: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    causeId: PropTypes.arrayOf(PropTypes.number), // Ensure causeId is an array of numbers
    isFollowing: PropTypes.bool,
  }),
};

export default OrganizationForm;
