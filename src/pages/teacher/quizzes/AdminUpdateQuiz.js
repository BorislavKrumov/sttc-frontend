import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./AdminUpdateQuiz.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar";
import FormContainer from "../../../components/FormContainer";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import { fetchCategories } from "../../../actions/categoriesActions";
import "./AdminUpdateQuiz.css";
import { fetchQuizzes, updateQuiz } from "../../../actions/quizzesActions";

const AdminUpdateQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const quizId = params.quizId;

  const oldQuiz = useSelector((state) =>
    state.quizzesReducer.quizzes.filter((quiz) => quiz.quizId == quizId)
  )[0];

  const [title, setTitle] = useState(oldQuiz.title);
  const [description, setDescription] = useState(oldQuiz.description);
  const [maxMarks, setMaxMarks] = useState(oldQuiz.maxMarks);
  const [numberOfQuestions, setNumberOfQuestions] = useState(
    oldQuiz.numberOfQuestions
  );
  const [isActive, setIsActive] = useState(oldQuiz.isActive);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const [categories, setCategories] = useState(categoriesReducer.categories);

  const onClickPublishedHandler = () => {
    setIsActive(!isActive);
  };

  const onSelectCategoryHandler = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const submitHandler = (e) => {
    e.preventDefault();
    if (selectedCategoryId !== null && selectedCategoryId !== "n/a") {
      const quiz = {
        quizId:quizId,
        title: title,
        description: description,
        maxMarks: maxMarks,
        numberOfQuestions: numberOfQuestions,
        isActive: isActive,
        category: {
          catId: selectedCategoryId,
          title: categories.filter((cat) => cat.catId == selectedCategoryId)[0][
            "title"
          ],
          description: categories.filter(
            (cat) => cat.catId == selectedCategoryId
          )[0]["description"],
        },
      };
      updateQuiz(dispatch, quiz, token).then((data) => {
        if (data.type === quizzesConstants.UPDATE_QUIZ_SUCCESS){
          swal("Тестът се обнови!", `${quiz.title} е обновен`, "success");
          fetchQuizzes(dispatch, token);
        }
        else {
          swal("Тестът НЕ се обнови!", `${quiz.title} НЕ е обновен`, "error");
        }
      });
    } else {
      alert("Изберете валидна категория!");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories(dispatch, token).then((data) => {
        setCategories(data.payload);
      });
    }
  }, [categories]);

  return (
    <div className="adminUpdateQuizPage__container">
      <div className="adminUpdateQuizPage__sidebar">
        <Sidebar />
      </div>
      <div className="adminUpdateQuizPage__content">
        <FormContainer>
          <h2>Обнови теста</h2>
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
              ></Form.Control>
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
              ></Form.Control>
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
              ></Form.Control>
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
              ></Form.Control>
            </Form.Group>

            <Form.Check
            style={{borderColor:"rgb(68 177 49)"}}
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
                {categories ? (
                  categories.map((cat, index) => (
                    <option key={index} value={cat.catId}>
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
              className="my-5 adminUpdateQuizPage__content--button"
              type="submit"
              variant="primary"
            >
              Добави
            </Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

export default AdminUpdateQuiz;
