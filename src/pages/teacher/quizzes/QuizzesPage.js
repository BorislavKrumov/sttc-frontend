import React, { useEffect, useState } from "react";
import "./QuizzesPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import Message from "../../../components/Message";
import Sidebar from "../../../components/Sidebar";
import Loader from "../../../components/Loader";
import { deleteQuiz, fetchQuizzes } from "../../../actions/quizzesActions";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import swal from "sweetalert";

const QuizzesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const catId = urlParams.get("catId");
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);

  const addNewQuizHandler = () => {
    navigate("teacherAddQuiz");
  };
  const deleteQuizHandler = (quiz) => {
    swal({
      title: "Сигурен ли си?",
      text: "След като бъде изтрит, няма да можете да възстановите този тест!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteQuiz(dispatch, quiz.quizId, token).then((data) => {
          if (data.type === quizzesConstants.DELETE_QUIZ_SUCCESS) {
            swal(
              "Тестът е изтрит!",
              `${quiz.title} е успешно изтрит.`,
              "success"
            );
          } else {
            swal("Тестът не е изтрит!", `${quiz.title} НЕ е успешно изтрит.`, "error");
          }
        });
      } else {
        swal(`${quiz.title} е в безопастност.`);
      }
    });
  };
  const updateQuizHandler = (quizTitle, quizId) => {
    navigate(`/teacherUpdateQuiz/${quizId}`);
  };

  const questionsHandler = (quizTitle, quizId) => {
    navigate(`teacherQuestions/?quizId=${quizId}&quizTitle=${quizTitle}`);
  };

  useEffect(() => {
    if (quizzes.length === 0) {
      fetchQuizzes(dispatch, token).then((data) => {
        setQuizzes(data.payload);
      });
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  return (
    <div className="quizzesPage__container">
      <div className="quizzesPage__sidebar">
        <Sidebar />
      </div>
      <div className="quizzesPage__content">
        <h2>Тестове</h2>
        {quizzes ? (
          quizzes.length === 0 ? (
            <Message>Няма тестове. Опитайте да добавите нов тест.</Message>
          ) : (
            quizzes.map((quiz, index) => {
              if ((catId && quiz.category.catId == catId) || (catId == null))
                return (
                  <ListGroup
                    className="quizzesPage__content--quizzesList"
                    key={index}
                  >
                    <ListGroup.Item className="align-items-start" action>
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{quiz.title}</div>
                        <p style={{ color: "grey" }}>{quiz.category.title}</p>
                        {<p className="my-3">{quiz.description}</p>}
                        <div className="quizzesPage__content--ButtonsList">
                          <div
                            onClick={() =>
                              questionsHandler(quiz.title, quiz.quizId)
                            }
                            style={{
                              border: "1px solid grey",
                              width: "100px",
                              height: "35px",
                              padding: "1px",
                              textAlign: "center",
                              borderRadius: "5px",
                              color: "white",
                              backgroundColor: "rgb(68 177 49)",
                              margin: "0px 4px",
                            }}
                          >{`Въпроси`}</div>
                          <div
                            style={{
                              border: "1px solid grey",
                              width: "100px",
                              padding: "1px",
                              textAlign: "center",
                              borderRadius: "5px",
                              height: "35px",
                              margin: "0px 4px",
                            }}
                          >{`Точки : ${quiz.maxMarks}`}</div>
                          <div
                            style={{
                              border: "1px solid grey",
                              width: "100px",
                              padding: "1px",
                              textAlign: "center",
                              borderRadius: "5px",
                              height: "35px",
                              margin: "0px 4px",
                            }}
                          >{`${quiz.numberOfQuestions} Въпроси`}</div>
                          <div
                            onClick={() =>
                              updateQuizHandler(quiz.title, quiz.quizId)
                            }
                            style={{
                              border: "1px solid grey",
                              color: "white",
                              backgroundColor: "rgb(68 177 49)",
                              width: "100px",
                              padding: "1px",
                              textAlign: "center",
                              borderRadius: "5px",
                              height: "35px",
                              margin: "0px 4px",
                            }}
                          >{`Обнови`}</div>
                          <div
                            onClick={() => deleteQuizHandler(quiz)}
                            style={{
                              border: "1px solid grey",
                              color: "white",
                              backgroundColor: "#ff0b0bdb",
                              width: "100px",
                              padding: "2px",
                              textAlign: "center",
                              borderRadius: "5px",
                              height: "35px",
                              margin: "0px 4px",
                            }}
                          >{`Изтрий`}</div>
                        </div>
                      </div>
                      {/* <Badge bg="primary" pill></Badge> */}
                    </ListGroup.Item>
                  </ListGroup>
                );
            })
          )
        ) : (
          <Loader />
        )}
        <Button
          variant=""
          className="quizzesPage__content--button"
          onClick={addNewQuizHandler}
        >
          Добави тест
        </Button>
      </div>
    </div>
  );
};

export default QuizzesPage;
