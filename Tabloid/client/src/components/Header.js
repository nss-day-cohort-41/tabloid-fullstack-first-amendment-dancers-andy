import React, { useState, useContext, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { users, auser, getAllUsers, currentUser, getUserById, getCurrentUser} = useContext(UserProfileContext);
  const clientUser = JSON.parse(sessionStorage.getItem('userProfile'));
  let currentUserType = 3
    

  if (isLoggedIn) {
    currentUserType = JSON.parse(sessionStorage.getItem('userProfile')).userTypeId 
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/posts">Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/my_posts">My Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/searchbytag">Search by Tag</NavLink>
                </NavItem>
              </>
            }
          </Nav>


          <Nav navbar style={{marginRight: "5%"}}>
            {isLoggedIn && currentUserType === 1 &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/user">User Profiles</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/category">Category Management</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/tagmanagement">Tag Management</NavLink>
                </NavItem>
              </>

            }
          </Nav>
          
          
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
