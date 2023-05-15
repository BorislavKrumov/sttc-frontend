import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import { addQuestion } from "../../../actions/questionsActions";
import FormContainer from "../../../components/FormContainer";
import * as questionsConstants from "../../../constants/questionsConstants";
import "./AddQuestion.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar";

const AddQuestion = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const onSelectAnswerHandler = (e) => {
    setAnswer(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (answer !== null && answer !== "n/a") {
      const question = {
        content: content,
        image: image,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer,
        quiz: {
          quizId: quizId,
        },
      };

      addQuestion(dispatch, question, token).then((data) => {
        if (data.type === questionsConstants.ADD_QUESTION_SUCCESS)
          swal("Въпросът е добавен!", `${content} е добавен`, "success");
        else {
          swal("Въпросът НЕ е добавен!", `${content} НЕ е добавен`, "error");
        }
      });
    } else {
      alert("Избери валиден отговор!");
    }
  };

  return (
    <div className="addQuestion__container">
      <div className="addQuestion__sidebar">
        <Sidebar />
      </div>
      <div className="addQuestion__content">
        <FormContainer>
          <h2>Добави въпрос</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-3" controlId="content">
              <Form.Label>Въпрос</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="3"
                type="text"
                placeholder="Въведете съдържанието на въпроса"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="option1">
              <Form.Label>Отговор 1</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="2"
                type="text"
                placeholder="Въведете Отговор 1"
                value={option1}
                onChange={(e) => {
                  setOption1(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="option2">
              <Form.Label>Отговор 2</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="2"
                type="text"
                placeholder="Въведете Отговор 2"
                value={option2}
                onChange={(e) => {
                  setOption2(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="option3">
              <Form.Label>Отговор 3</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="2"
                type="text"
                placeholder="Въведете Отговор 3"
                value={option3}
                onChange={(e) => {
                  setOption3(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="option4">
              <Form.Label>Отговор 4</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="2"
                type="text"
                placeholder="Въведете Отговор 4"
                value={option4}
                onChange={(e) => {
                  setOption4(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <div className="my-3">
              <label htmlFor="answer-select">Изберете правилната отговор:</label>
              <Form.Select
                aria-label="Изберете Правилен Отговор"
                id="answer-select"
                onChange={onSelectAnswerHandler}
              >
                <option value="n/a">Правилен Отговор</option>
                <option value="option1">Отговор 1</option>
                <option value="option2">Отговор 2</option>
                <option value="option3">Отговор 3</option>
                <option value="option4">Отговор 4</option>
                {/* {categories ? (
                  categories.map((cat, index) => (
                    <option key={index} value={cat.catId}>
                      {cat.title}
                    </option>
                  ))
                ) : (
                  <option value="">Choose one from below</option>
                )} */}
                {/* <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option> */}
              </Form.Select>
            </div>
            <Button
              className="my-5 addQuestion__content--button"
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

export default AddQuestion;
