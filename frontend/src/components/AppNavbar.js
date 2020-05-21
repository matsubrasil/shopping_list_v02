import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  //NavLink,
} from 'reactstrap';

import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';

function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // const guestLinks = (
  //   <React.Fragment>
  //     <NavItem>
  //       <RegisterModal />
  //     </NavItem>
  //     <NavItem>
  //       <LoginModal />
  //     </NavItem>
  //   </React.Fragment>
  // );
  return (
    <Navbar color="dark" dark expand="sm" className="mb-5">
      <Container>
        <NavbarBrand href="/">Shopping List</NavbarBrand>
        <NavbarToggler onClick={() => toggle()} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <RegisterModal />
            </NavItem>
            <NavItem>
              <Logout />
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
