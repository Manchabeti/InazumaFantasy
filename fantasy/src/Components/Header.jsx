import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = ({ menuItems }) => {
  const navbarStyle = {
    background: '#000',
    borderBottom: '2px solid #ff8c00',
    color: '#fff',
  };

  const togglerStyle = {
    background: '#ff8c00',
    border: '1px solid #ff8c00',
  };

  return (
    <Navbar style={navbarStyle} expand="lg">
      <Navbar.Brand href="/">
        <img
          src="../../public/logo.png"
          height="70"
          className="d-inline-block align-top"
          alt="Tu Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" style={togglerStyle} />
      <Navbar.Collapse id="navbarNav" className="justify-content-end">
        <Nav>
          {menuItems.map((item, index) => (
            <Nav.Link key={index} style={{ color: '#fff' }} href={item.route}>
              {item.name}
            </Nav.Link>
          ))}
           <Nav.Link style={{ color: '#fff' }} href="/"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 36"><path fill="currentColor" d="M7 6h16v9.8h2V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2H7Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M28.16 17.28a1 1 0 0 0-1.41 1.41L30.13 22h-14.5a1 1 0 0 0-1 1a1 1 0 0 0 1 1h14.5l-3.38 3.46a1 1 0 1 0 1.41 1.41l5.84-5.8Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="none" d="M0 0h36v36H0z"/></svg></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;