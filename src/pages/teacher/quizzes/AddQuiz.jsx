import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./AddQuiz.css";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import FormContainer from "../../../components/FormContainer";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import { addQuiz } from "../../../actions/quizzesActions";
import { fetchCourses } from "../../../actions/coursesActions";
import Sidebar from "../../../components/Sidebar";

const AddQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxMarks, setMaxMarks] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [errors, setErrors] = useState({});

  const coursesReducer = useSelector((state) => state.coursesReducer);
  const [courses, setCourses] = useState(coursesReducer.courses);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickPublishedHandler = () => {
    setIsActive(!isActive);
  };

  const onSelectCategoryHandler = (e) => {
    setSelectedCourseId(Number(e.target.value));
  };

  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const submitHandler = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    const newErrors = validateForm(form);
    setErrors(newErrors);
    if (Object.values(newErrors).length > 0) {
      return;
    }
    if (selectedCourseId !== null && selectedCourseId !== "n/a") {
      const quiz = {
        title: title,
        description: description,
        maxMarks: maxMarks,
        numberOfQuestions: numberOfQuestions,
        isActive: isActive,
        course: {
          id: selectedCourseId,
          title: courses.filter((course) => course.id == selectedCourseId)[0][
            "title"
          ],
          description: courses.filter(
            (course) => course.id == selectedCourseId
          )[0]["description"],
        },
      };
      addQuiz(dispatch, quiz, token).then((data) => {
        if (data.type === quizzesConstants.ADD_QUIZ_SUCCESS)
          swal("Quiz Added!", `${quiz.title} succesfully added`, "success");
        else {
          swal("Quiz Not Added!", `${quiz.title} not added`, "error");
        }
      });
    } else {
      alert("Select valid course!");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses(dispatch, token).then((data) => {
        setCourses(data.payload);
      });
    }
  }, []);
  const validateForm = (form) => {
    const newErrors = {}
    const { title, description, maxMarks, numberOfQuestions } = form

    if (!title.value || title.value.length < 3) {
      newErrors.title = "Невалидно заглавие";
    }
    if (!description.value || description.value.length < 3) {
      newErrors.description = "Невалидно описание";
    }
    if (!maxMarks.value || maxMarks.value < 1) {
      newErrors.maxMarks = "Невалидни точки";
    }
    if (!numberOfQuestions.value || numberOfQuestions.value < 1) {
      newErrors.numberOfQuestions = "Невалиден брой въпроси";
    }
    return newErrors;
  }
  return (
    <div className="addQuiz__content">
      <FormContainer>
        <h2>Добави тест</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="title">
            <Form.Label>Заглавие</Form.Label>
            <Form.Control
              type="text"
              placeholder="Добави заглавие на теста"
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
              rows="3"
              type="text"
              placeholder="Добави описание на теста"
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

          <Form.Group className="my-3" controlId="maxMarks">
            <Form.Label>Максимум точки</Form.Label>
            <Form.Control
              type="number"
              placeholder="Добави максимум точки на теста"
              value={maxMarks}
              onChange={(e) => {
                setMaxMarks(e.target.value);
              }}
              isInvalid={errors.maxMarks}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
            {errors.maxMarks}
          </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-3" controlId="numberOfQuestions">
            <Form.Label>Брой въпроси</Form.Label>
            <Form.Control
              type="number"
              placeholder="Въведи брой въпроси"
              value={numberOfQuestions}
              onChange={(e) => {
                setNumberOfQuestions(e.target.value);
              }}
              isInvalid={errors.numberOfQuestions}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
            {errors.numberOfQuestions}
          </Form.Control.Feedback>
          </Form.Group>

          <Form.Check
            className="my-3"
            type="switch"
            id="publish-switch"
            label="Публичен тест"
            onChange={onClickPublishedHandler}
            checked={isActive}
          />

          <div className="my-3">
            <label htmlFor="category-select">Избери курс:</label>
            <Form.Select
              aria-label="Choose Category"
              id="category-select"
              onChange={onSelectCategoryHandler}
            >
              <option value="n/a">Избери курс</option>
              {courses ? (
                courses.map((cat, index) => (
                  <option key={index} value={cat.id}>
                    {cat.title}
                  </option>
                ))
              ) : (
                <option value="">Изберете един от долу</option>
              )}
              {/* <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option> */}
            </Form.Select>
          </div>
          <Button
            className="my-5 addQuiz__content--button"
            type="submit"
            variant="primary"
          >
            Добави
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default AddQuiz;
