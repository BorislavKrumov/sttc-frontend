import React, { useEffect, useState } from "react";
import "./UserQuizManualPage.css";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import { fetchQuizzes } from "../../actions/quizzesActions";

const UserQuizManualPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);
  const [quiz, setQuiz] = useState(
    quizzes.filter((q) => q.quizId == quizId)[0]
  );
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const startQuizHandler = (quizTitle, quizId) => {
    navigate(`/questions/?quizId=${quizId}&quizTitle=${quizTitle}`);
  };

  useEffect(() => {
    if (quizzes.length == 0) {
      fetchQuizzes(dispatch, token).then((data) => {
        const temp = data.payload;
        setQuizzes(temp);
        setQuiz(temp.filter((q) => q.quizId == quizId)[0]);
      });
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  return (
    <div className="quizManualPage__container">
      <div className="quizManualPage__sidebar">
        <Sidebar />
      </div>
      {quiz ? (
        <div className="quizManualPage__content">
          <div className="quizManualPage__content--section">
            <h5>Прочетете внимателно инструкциите на тази страница</h5>
            <p style={{ color: "grey" }}>Остава още една стъпка</p>
          </div>

          <div className="quizManualPage__content--section">
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
          </div>

          <hr />

          <div>
            <h3>Важни инструкции</h3>
            <ul>
              <li>Този тест е само с цел практика.</li>
              <li>
              Трябва да изпратите тест в рамките на <strong>20 минути</strong>.
              </li>
              <li>Можете да опитате теста произволен брой пъти.</li>
              <li>
                Има <strong>{quiz.numberOfQuestions} въпроси</strong> в
                този тест.
              </li>
              <li>Този тест е само с цел практика.</li>
              <li>
              Общият брой точки за този тест е <strong>{quiz.maxMarks}.</strong>
              </li>
            </ul>
          </div>

          <hr />

          <div>
            <h3>Опит за тест</h3>
            <ul>
              <li>
                Натиснете <strong>Старт на теста</strong> бутон за стартиране на теста.
              </li>
              <li>
              Таймерът ще започне в момента, когато щракнете върху Старт
                Бутона за тест.
              </li>
              <li>
              Не можете да възобновите този тест, ако бъде прекъснат поради някаква причина.
              </li>
              <li>
              Кликнете върху бутона <strong>Изпращане на тест</strong> при завършване на
                теста.
              </li>
              <li>
              Резултатът от теста се генерира автоматично в PDF формат.
              </li>
            </ul>
          </div>

          <Button
            className="quizManualPage__content--button"
            onClick={() => startQuizHandler(quiz.title, quiz.quizId)}
            style={{
              border: "1px solid grey",
              margin: "2px 8px",
            }}
            variant="primary"
          >{`Старт на теста`}</Button>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserQuizManualPage;
