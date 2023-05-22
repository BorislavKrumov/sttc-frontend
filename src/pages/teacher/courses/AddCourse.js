import React, { useState } from "react";
import "./AddCourse.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import FormContainer from "../../../components/FormContainer";
import { addCategory } from "../../../actions/categoriesActions";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    const newErrors = validateForm(form);
    setErrors(newErrors);
    if (Object.values(newErrors).length > 0) {
      return;
    }
    const category = { title: title, description: description };
    addCategory(dispatch, category, token).then((data) => {
      if (data.type === categoriesConstants.ADD_CATEGORY_SUCCESS) {
        swal("Курсът е добавен!", `${title} е добавено успешно`, "success");
      } else {
        swal("Курсът НЕ е добавен!", `${title} НЕ е добавено успешно`, "error");
      }
      
    });
  };
  const validateForm = (form) => {
    const newErrors = {}
    const { title, description } = form

    if (!title.value || title.value.length < 3) {
      newErrors.title = "Невалидно заглавие";
    }
    if (!description.value || description.value.length < 3) {
      newErrors.description = "Невалидно описание";
    }
    
    return newErrors;
  }

  return (
    <div className="coursesPage__content">
      <FormContainer>
        <h2>Добави курс</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="title">
            <Form.Label>Заглавие</Form.Label>
            <Form.Control
              type="text"
              placeholder="Въведете име на курса"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              isInvalid={errors.title}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-3" controlId="description">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              style={{ textAlign: "top" }}
              as="textarea"
              rows="5"
              type="text"
              placeholder="Въведете описание на курса"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              isInvalid={errors.description}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
          </Form.Group>

          <Button
            className="my-3 coursesPage__content--button"
            type="submit"
            variant=""
          >
            Добави
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default AddCourse;
