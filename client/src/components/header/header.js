import React from 'react';
import styles from './header.module.scss';
import Logo from '../logo/logo';
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Offcanvas, Container, NavDropdown, Form, FormControl, Button } from "react-bootstrap"
function Header() {
    const history = useHistory();
    const handleLogoClick = () => {
        history.push("/")
    }
    return (
        <Navbar className={styles.header} expand={false}>
            <Container fluid>
                <Navbar.Brand href="#"><Logo /></Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" className={styles.hamburger} bsPrefix="hamburger">
                    <span />
                    <span />
                    <span />
                </Navbar.Toggle>
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    className={styles.menu}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            <Nav.Link href="">Link</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;