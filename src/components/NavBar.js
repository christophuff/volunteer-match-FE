/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import ProfileDropdown from './ProfileDropdown';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          <Image src="/images/VM.png" alt="VM logo" className="logo-img" width={30} height={30} />
          <span className="logo-1-span">Volunteer</span>
          <span className="logo-2-span">Match</span>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link className="nav-link" href="/connect">
              Connect
            </Link>
            <Link className="nav-link" href="/community">
              Community
            </Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center ms-auto">
          <ProfileDropdown />
        </div>
      </Container>
    </Navbar>
  );
}
