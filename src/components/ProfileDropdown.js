import { useAuth } from '@/utils/context/authContext';
import Image from 'next/image';
import { Dropdown } from 'react-bootstrap';
import { signOut } from '../utils/auth';

function ProfileDropdown() {
  const { user } = useAuth();

  return (
    <Dropdown align="end">
      <Dropdown.Toggle as="div" id="dropdown-custom-components" style={{ cursor: 'pointer' }}>
        <Image src={user.photoURL} alt="User Profile" width={40} height={40} className="rounded-circle" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileDropdown;
