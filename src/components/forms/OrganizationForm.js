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
  causeId: '',
  isFollowing: false,
};

function OrganizationForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [causes, setCauses] = useState([]);
  const [volunteer, setvolunteer] = useState({});
  const [fixedObj, setFixedObj] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getVolunteersByUid(user.uid).then(setvolunteer);
    getCauses().then(setCauses);
    if (obj.id) {
      console.log("It's a hit!");
      setFixedObj(obj);
      delete fixedObj.cause;
      delete fixedObj.volunteer;
      setFormInput(fixedObj);
    }
  }, [obj, user, fixedObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      console.log(formInput);
      updateOrganization(formInput).then(() => router.push(`/organizations/${obj.id}`));
    } else {
      const payload = { ...formInput, volunteerId: volunteer.id };
      console.log(payload);
      createOrganization(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
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
      <FloatingLabel controlId="floatingInput4" label="Orgaization Location" className="mb-3">
        <Form.Control type="text" placeholder="Organization's Location" name="location" value={formInput.location} onChange={handleChange} required />
      </FloatingLabel>

      {/* CAUSE SELECT  */}
      <FloatingLabel controlId="floatingSelect">
        <Form.Select aria-label="cause" name="causeId" onChange={handleChange} className="mb-3" value={formInput.causeId || ''} required>
          <option value="">Select a Cause</option>
          {causes.map((cause) => (
            <option key={cause.id} value={cause.id}>
              {cause.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

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
    causeId: PropTypes.number,
    isFollowing: PropTypes.bool,
  }),
};

export default OrganizationForm;
