import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { useAuth0 } from "../react-auth0-spa";

const NavBar = ({editable, sections}) => {

// determine if the sections sent in have any ones with menutitle set..
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, loginWithRedirect,editState,toggleEditState, logout} = useAuth0();
  const toggle = () => setIsOpen(!isOpen);


  var hasMore=[];
  //  console.log("sections", sections);
    if(typeof sections === 'object')
    {
      sections.map(section =>{
    //      console.log("section",section);
          // items will show up in the navigational bar based on if menutitle
          // is in the configuration file for the item...

          if(section.menutitle != undefined && (section.loginDisplay == true || isAuthenticated)){
            hasMore.push(section)
            return(section);
          }
      })

    }


  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  const currentEditState = () =>{
  //  console.log("editState: " + editState);
    return(editState == true?"Stop Edit":"Edit");
  };


  return (
    <div className="nav-container">isAuthenticated
      <Navbar fixed="top" color="light" light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>

                {hasMore.length > 0 && (
                         hasMore.map(section =>(
                           <NavItem key = {section.name}><NavLink href =
                             {'#' + section.name}>{section.menutitle}</NavLink>
                         </NavItem>))
                  )}

                  {(isAuthenticated && editable) && (
                    <NavItem>
                      <Button
                        id="qsEditBtn"
                        color="primary"
                        class="btn btn-sm btn-outline-success"
                        block
                        onClick={() => toggleEditState({})}
                        >
                      {currentEditState()}
                    </Button>

                    </NavItem>
                  )}

            </Nav>
              <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (

                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"Navbar
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>

              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                    Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}

            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>

                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
