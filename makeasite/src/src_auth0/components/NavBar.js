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

function test(){
//  console.log("testing route")
}

const NavBar = ({additionalNavButtons, navChoices, articles}) => {

// determine if the articles sent in have any ones with menutitle set..
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout} = useAuth0();
  const toggle = () => setIsOpen(!isOpen);


  var hasMore=[];
    if(typeof articles === 'object')
    {
      articles.map(section =>{
            // items will show up in the navigational bar based on if menutitle
          // is in the configuration file for the item...

          if(section.menutitle != undefined && (section.loginDisplay == false || isAuthenticated)){
            hasMore.push(section)
            return(section);
          }
      })

    }


  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

const inNavChoices = (val) =>
  navChoices(val);
// added buttons need to be close to the login button...

  var idNum = 0;
  var addButtonsArray = [];

  if(additionalNavButtons)
    addButtonsArray = additionalNavButtons();

  return (
    <div className="nav-container">
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
            </Nav>

              <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated ?

                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>

              :
              <div class="pull-right">
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
                      tag={RouterNavLink}
                      to="/something"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                    Website Only
                    </DropdownItem>

                    {addButtonsArray.map(addButton =>(
                          <DropdownItem
                            id={addButton.id}
                            onClick={() => inNavChoices(addButton.nav)}
                          >
                          {addButton.label}
                         </DropdownItem>
                    ))}


                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                </div>
              }
            </Nav>

          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
