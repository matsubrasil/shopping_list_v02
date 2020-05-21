import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
} from 'reactstrap';

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
              <NavLink href="https://github.com/bradtraversy">Github</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
