import React, { useState } from "react";
import "./UpdateCourse.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import FormContainer from "../../../components/FormContainer";
import { updateCategory } from "../../../actions/categoriesActions";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const UpdateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const catId = params.catId;

  const oldCategory = useSelector((state) =>
    state.categoriesReducer.categories.filter((cat) => cat.catId == catId)
  )[0];
  const [title, setTitle] = useState(oldCategory ? oldCategory.title : "");
  const [description, setDescription] = useState(
    oldCategory ? oldCategory.description : ""
  );
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const submitHandler = (e) => {
    e.preventDefault();
    const category = { catId: catId, title: title, description: description };
    updateCategory(dispatch, category, token).then((data) => {
      if (data.type === categoriesConstants.UPDATE_CATEGORY_SUCCESS) {
        swal("Курсът е обновен!", `${title} е правилно обновен`, "success");
      } else {
        swal("Курсът НЕ е обновен!", `${title} НЕ е обновен`, "error");
      }
    });
    navigate("/teacherCourse");
  };

  return (
    <div className="updateCoursePage__container">
      <div className="updateCoursePage__sidebar">
        <Sidebar />
      </div>
      <div className="updateCoursePage__content">
        <FormContainer>
          <h2>Обнови курсът</h2>
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
              ></Form.Control>
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
              ></Form.Control>
            </Form.Group>

            <Button
              className="my-3 updateCoursePage__content--button"
              type="submit"
              variant=""
            >
              Обнови
            </Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

export default UpdateCourse;
