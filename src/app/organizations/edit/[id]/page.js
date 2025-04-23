'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrganizationForm from '../../../../components/forms/OrganizationForm';
import { getSingleOrganization } from '../../../../api/organizationData';

export default function EditOrganization({ params }) {
  const [editItem, setEditItem] = useState({});

  const { id } = params;

  useEffect(() => {
    getSingleOrganization(id).then(setEditItem);
  }, [id]);

  return <OrganizationForm obj={editItem} />;
}

EditOrganization.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
