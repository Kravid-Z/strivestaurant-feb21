import { Navbar, Nav } from "react-bootstrap";
import React from "react";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = {};
    console.log("Construtor has started")
  }

  render() {
      console.log('First render')
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          {this.props.title} - Strive for food
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {this.props.links.map((link) => (
              <Nav.Link key={link} href={"#" + link.toLowerCase()}>
                {link}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;

// functional components are a touch faster than class based ones
