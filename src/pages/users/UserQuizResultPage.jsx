import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./UserQuizResultPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuizResult } from "../../actions/quizResultActions";
import * as quizResultConstants from "../../constants/quizResultConstants";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const UserQuizResultPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizResultReducer = useSelector((state) => state.quizResultReducer);
  const [quizResults, setQuizResults] = useState(null);
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.userId : null;

  useEffect(() => {
    if (quizResults == null)
      fetchQuizResult(dispatch, userId, token).then((data) => {
        if (data.type === quizResultConstants.FETCH_QUIZ_RESULT_SUCCESS) {
          setQuizResults(data.payload);
        }
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  return (
      <div className="userQuizResultPage__content">
        {quizResults && quizResults.length !== 0 ? (
          <Table bordered className="userQuizResultPage__content--table">
            <thead>
              <tr>
                <th>Номер на теста</th>
                <th>Име на теста</th>
                <th>Име на курса</th>
                <th>Получени точки</th>
                <th>Общ брой точки</th>
                <th>Дата</th>
              </tr>
            </thead>
            {quizResults.map((r, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{r.quiz.quizId}</td>
                    <td>{r.quiz.title}</td>
                    <td>{r.quiz.course.title}</td>
                    <td>{r.totalObtainedMarks}</td>
                    <td>{r.quiz.maxMarks}</td>
                    <td>{r.attemptDatetime}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        ) : (
          <Message>
            Няма резултати за показване. Опитайте някой <Link to="/quizzes">Тест.</Link>
          </Message>
        )}
      </div>
  );
};

export default UserQuizResultPage;
