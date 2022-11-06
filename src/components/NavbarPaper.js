import { Container,Nav,Navbar, Button} from 'react-bootstrap';

import {db, auth} from '../firebase'
import {  signOut } from "firebase/auth";
import { GoSignOut } from 'react-icons/go';
import logo from '../images/paperhub.png'

function SignOut()
    {
        
        signOut(auth).then(() => {
          
        // Sign-out successful.
        window.location.href = '/';
        })
        
    }

function NavbarPaper() {
  return (
    <Navbar bg="dark" variant = "dark" expand="lg">
        
        <Navbar.Brand href="/dashboard">
          <img
              src={logo}
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            
          </Nav>
          <Nav >
            <Nav.Item><Button variant="secondary" onClick={SignOut}>Sign out <GoSignOut/> </Button></Nav.Item>
            
          </Nav>
        </Navbar.Collapse>

    </Navbar>
  );
}

export default NavbarPaper;