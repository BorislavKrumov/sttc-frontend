import React, { useEffect, useState } from "react";
import "./Questions.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { fetchQuestionsByQuiz } from "../../../actions/questionsActions";
import Question from "../../../components/Question";
import Loader from "../../../components/Loader";
import Sidebar from "../../../components/Sidebar";

const Questions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");
  const quizTitle = urlParams.get("quizTitle");

  const questionsReducer = useSelector((state) => state.questionsReducer);
  const [questions, setQuestions] = useState(questionsReducer.questions);
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  let answers = {};

  const addNewQuestionHandler = () => {
    navigate(`/teacherAddQuestion/?quizId=${quizId}`);
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    fetchQuestionsByQuiz(dispatch, quizId, token).then((data) =>
      setQuestions(data.payload)
    );
  }, []);

  return (
    <div className="questionsPage__container">
      <div className="questionsPage__sidebar">
        <Sidebar />
      </div>
      <div className="questionsPage__content">
        <h2>{`Questions : ${quizTitle}`}</h2>
        <Button
          className="questionsPage__content--button"
          onClick={addNewQuestionHandler}
        >
          Добави въпрос
        </Button>
        {questions ? (
          questions.map((q, index) => {
            return (
              <Question
                key={index}
                number={index + 1}
                answers={answers}
                question={q}
                isAdmin={true}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Questions;
