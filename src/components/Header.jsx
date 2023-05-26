import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import * as authConstants from "../constants/authConstants";


const Header = () => {
  const dispatch = useDispatch();
  const loginReducer = useSelector((state) => state.loginReducer);

  const logoutHandler = () => {
    dispatch({
      type: authConstants.USER_LOGOUT,
    });
  };

  return (
    <header>
      <Navbar style = {{backgroundColor: "#00202B"}} variant="dark" expand="lg" collapseOnSelect>
        <Container>
            <Navbar.Brand>Център за обучение по софтуерни технологии</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {loginReducer.loggedIn ? (
                  <Nav.Link>{loginReducer.user ? loginReducer.user.firstName : ""}</Nav.Link>
              ) : (
                <LinkContainer to="/">
                  <Nav.Link>Вход</Nav.Link>
                </LinkContainer>
              )}

              {loginReducer.loggedIn ? (
                <LinkContainer to="/">
                  <Nav.Link onClick={logoutHandler}>Изход</Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to="/register">
                  <Nav.Link>Регистрация</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
