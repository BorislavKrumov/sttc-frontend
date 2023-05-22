import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../actions/authActions";
import Loader from "../components/Loader";
import * as authConstants from "../constants/authConstants";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [hasLoginError, setHasLoginError] = useState(false);
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    if (temp) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(dispatch, username, password).then((data) => {
      if (data.type === authConstants.USER_LOGIN_SUCCESS) {
        setHasLoginError(false)
        return navigate("/profile");
      } else if (data.type === authConstants.USER_LOGIN_FAILURE){
        setHasLoginError(true)
      }
    });
  };

  useEffect(() => {
    if (token && user) {
      return navigate("/profile")
    }
  }, []);
  return (
    <FormContainer>
      <h1>Вход</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="username">
          <Form.Label>Потребителско име</Form.Label>
          <Form.Control
            type="text"
            placeholder="Въведете потребителско име"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Парола</Form.Label>
          <InputGroup>
            <Form.Control
              type={`${passwordType}`}
              placeholder="Въведете парола"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              onClick={showPasswordHandler}
              variant=""
              style={{ border: "1px solid black" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button
          variant=""
          className="my-3"
          type="submit"
          style={{ backgroundColor: "lightskyblue", color: "white", width: "100%", fontSize: "1.2rem" }}
        >
          Вход
        </Button>
      </Form>

      {hasLoginError ? (
        <div style={{ color: "rgb(169 50 38)" }}> Грешно потребителско име или парола!</div>
      ) : null}

      {loginReducer.loading ? (
        <Loader />
      ) : (
        <Row className="py-3">
          <Col>
            Нов потребител?{" "}
            <Link to="/register" style={{ color: "lightskyblue" }}>
              Регистрация
            </Link>
          </Col>
        </Row>
      )}
    </FormContainer>

    
  );
};

export default LoginPage;
