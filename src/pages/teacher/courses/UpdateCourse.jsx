import React, { useState } from "react";
import "./UpdateCourse.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import * as coursesConstants from "../../../constants/coursesConstants";
import FormContainer from "../../../components/FormContainer";
import { updateCourse } from "../../../actions/coursesActions";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const UpdateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const oldCourse = useSelector((state) =>
    state.coursesReducer.courses.filter((cat) => cat.id == courseId)
  )[0];
  const [title, setTitle] = useState(oldCourse ? oldCourse.title : "");
  const [description, setDescription] = useState(
    oldCourse ? oldCourse.description : ""
  );
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const submitHandler = (e) => {
    e.preventDefault();
    const course = { id: courseId, title: title, description: description };
    updateCourse(dispatch, course, token).then((data) => {
      if (data.type === coursesConstants.UPDATE_COURSE_SUCCESS) {
        swal("Курсът е обновен!", `${title} е правилно обновен`, "success");
      } else {
        swal("Курсът НЕ е обновен!", `${title} НЕ е обновен`, "error");
      }
    });
    navigate("/teacherCourse");
  };

  return (
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
  );
};

export default UpdateCourse;
