import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import "./UserQuizzesPage.css";
import { fetchQuizzes } from "../../actions/quizzesActions";
import { Card, Col, Row } from "react-bootstrap";

const UserQuizzesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("courseId");
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);

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
      <div className="userQuizzesPage__content">
        {quizzes ? (
          <Row>
            {quizzes.map((q, index) => {
              if ((courseId && courseId == q.course.id) || courseId == null)
                return (
                  <Col
                    key={index}
                    xl={3}
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{}}
                  >
                    <Card
                      bg="light"
                      text="dark"
                      style={{
                        width: "100%",
                        height: "95%",
                        padding: "5px",
                        margin: "auto",
                        marginTop: "5px",
                        minWidth: "0px",
                        wordWrap: "break-word",
                      }}
                      className="mb-2"
                    >
                      <Card.Body>
                        <Card.Title>{q.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {q.course.title}
                        </Card.Subtitle>
                        <Card.Text>{q.description}</Card.Text>
                        <div className="userQuizzesPage__content--ButtonsList">
                          <div
                            className="userQuizzesPage__content--Button"
                            onClick={() =>
                              navigate(`/quizManual?quizId=${q.quizId}`)
                            }
                            style={{}}
                          >
                            {`Старт`}
                          </div>

                          <div
                            className="userQuizzesPage__content--Button"
                            onClick={() => console.log("View")}
                            style={{ color: "black", backgroundColor: "white" }}
                          >{`20 Минути`}</div>

                          <div
                            className="userQuizzesPage__content--Button"
                            onClick={() => console.log("View")}
                            style={{ color: "black", backgroundColor: "white" }}
                          >{`${q.numberOfQuestions} Въпроса`}</div>

                          <div
                            className="userQuizzesPage__content--Button"
                            onClick={() => console.log("View")}
                            style={{ color: "black", backgroundColor: "white" }}
                          >{`Точки : ${q.maxMarks}`}</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
            })}
          </Row>
        ) : (
          <p>Няма налични тестове</p>
        )}
      </div>
  );
};

export default UserQuizzesPage;
