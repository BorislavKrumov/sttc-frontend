import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as authConstants from "../constants/authConstants";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerReducer = useSelector((state) => state.registerReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    if (temp) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const showConfirmPasswordHandler = () => {
    const temp = !showConfirmPassword;
    setShowConfirmPassword(temp);
    if (temp) {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
  };

  const validateForm = (form) => {
    const newErrors = {}
    const { fname, lname, username, password, confirmPassword, email } = form

    if (!fname.value || fname.value.length < 3) {
      newErrors.fname = "Невалидно име";
    }
    if (!lname.value || lname.value.length < 3) {
      newErrors.lname = "Невалидна фамилия";
    }
    if (!username.value || username.value.length < 3) {
      newErrors.username = "Невалидно потребителско име";
    }
    if (!password.value || password.value.length < 8) {
      newErrors.password = "Невалиднa парола";
    }
    if (!confirmPassword.value || confirmPassword.value !== password.value) {
      newErrors.confirmPassword = "Невалиднa парола";
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) == false) {
      newErrors.email = "Невалиден e-mail";
    }
    
    return newErrors;
  }

  const submitHandler = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    const newErrors = validateForm(form);
    setErrors(newErrors);
    if (Object.values(newErrors).length > 0) {
      return;
    }

    const user = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
    };
    register(dispatch, user).then((data) => {
      if (data.type === authConstants.USER_REGISTER_SUCCESS) {
        navigate("/login");
      }
    });
  };

  return (
    <FormContainer>
      <h1>Регистрация</h1>
      <Form onSubmit={submitHandler} >
        <Form.Group className="my-3" controlId="fname">
          <Form.Label>Име</Form.Label>
          <Form.Control
            type="name"
            placeholder="Въведете име"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            isInvalid={errors.fname}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.fname}
          </Form.Control.Feedback>

        </Form.Group>

        <Form.Group className="my-3" controlId="lname">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            type="name"
            placeholder="Въведете фамилия"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            isInvalid={errors.lname}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.lname}
          </Form.Control.Feedback>

        </Form.Group>

        <Form.Group className="my-3" controlId="username">
          <Form.Label>Потребителско име</Form.Label>
          <Form.Control
            type="text"
            placeholder="Въведете потребителско име"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            isInvalid={errors.username}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
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
              isInvalid={errors.password}
            ></Form.Control>
            <Button
              onClick={showPasswordHandler}
              variant=""
              style={{ border: "1px solid black" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="my-3" controlId="confirmPassword">
          <Form.Label>Потвърди парола</Form.Label>
          <InputGroup>
            <Form.Control
              type={`${confirmPasswordType}`}
              placeholder="Потвърди парола"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              isInvalid={errors.confirmPassword}
            ></Form.Control>
            
            <Button
              onClick={showConfirmPasswordHandler}
              variant=""
              style={{ border: "1px solid black" }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="my-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="text"
            placeholder="Въведете E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            isInvalid={errors.email}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="" className="my-3" type="submit" style={{ backgroundColor: "#00202B", color: "white", width: "100%", fontSize: "1.2rem" }}>
          Регистрация
        </Button>
      </Form>

      {registerReducer.loading ? (
        <Loader />
      ) : (
        <Row className="py-3">
          <Col>
            Имате акаунт? <Link to="/" style={{ color: "lightskyblue" }}>Вход</Link>
          </Col>
        </Row>
      )}

    </FormContainer>
  );
};

export default RegisterPage;
