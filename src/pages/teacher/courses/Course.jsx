import React, { useEffect, useState } from "react";
import "./Course.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import * as coursesConstants from "../../../constants/coursesConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  deleteCourse,
  fetchCourses,
} from "../../../actions/coursesActions";
import swal from "sweetalert";
import Sidebar from "../../../components/Sidebar";

const Course = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const loginReducer = useSelector((state) => state.loginReducer);
  const coursesReducer = useSelector((state) => state.coursesReducer);
  const [courses, setCourses] = useState(coursesReducer.courses);

  const courseClickHandler = (courseId) => {
    if(loginReducer.user && 
      loginReducer.user.roles &&
      loginReducer.user.roles.length > 0 &&
      loginReducer.user.roles.find(role => role.roleName === "TEACHER")) {
        navigate(`/teacherQuizzes/?courseId=${courseId}`);
      } else {
        navigate(`/quiz/?courseId=${courseId}`);
      }

  };

  const addNewCourseHandler = () => {
    navigate("/teacherAddCourse");
  };

  const updateCourseHandler = (event, course) => {
    event.stopPropagation();
    navigate(`/updateCourse/${course.id}/`);
  };

  const deleteCourseHandler = (event, course) => {
    event.stopPropagation();
    swal({
      title: "Сигурен ли си?",
      text: "След като бъде изтрит, няма да можете да възстановите този курс!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCourse(dispatch, course.id, token).then((data) => {
          if (data.type === coursesConstants.DELETE_COURSE_SUCCESS) {
            swal(
              "Курсът е изтрит",
              `${course.title} е успешно изтрит`,
              "success"
            );
          } else {
            swal(
              "Курсът не е изтрит!",
              `${course.title} не е изтрито`,
              "error"
            );
          }
        });
      } else {
        swal(`${course.title} е в безопасност`);
      }
    });
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

  return (
    <div className="coursesPage__content">
      <h2>Курсове</h2>
      {courses ? (
        courses.length === 0 ? (
          <Message>
            Няма налични курсове. Опитайте да добавите някой курс.
          </Message>
        ) : (
          courses.map((cat, index) => {
            return (
              <ListGroup
                className="coursesPage__content--categoriesList"
                key={index}
              >
                <ListGroup.Item
                  style={{ borderWidth: "0px" }}
                  className="d-flex"
                  onClick={() => courseClickHandler(cat.id)}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{cat.title}</div>
                    {cat.description}
                  </div>

                {loginReducer.user && 
                loginReducer.user.roles &&
                loginReducer.user.roles.length > 0 &&
                loginReducer.user.roles.find(role => role.roleName === "TEACHER") &&

                  <div
                    style={{
                      display: "flex",
                      height: "90%",
                      margin: "auto 2px",
                    }}
                  >
                    <div
                      onClick={(event) => updateCourseHandler(event, cat)}
                      style={{
                        margin: "2px 8px",
                        textAlign: "center",
                        color: "rgb(68 177 49)",
                        fontWeight: "500",
                        cursor:"pointer"
                      }}
                    >{`Обнови`}</div>

                    <div
                      onClick={(event) => deleteCourseHandler(event, cat)}
                      style={{
                        margin: "2px 8px",
                        textAlign: "center",
                        color: "red",
                        fontWeight: "500",
                        cursor:"pointer"
                      }}
                    >{`Изтрий`}</div>
                  </div>
                }
                </ListGroup.Item>
              </ListGroup>
            );
          })
        )
      ) : (
        <Loader />
      )}
        {loginReducer.user && 
        loginReducer.user.roles &&
        loginReducer.user.roles.length > 0 &&
        loginReducer.user.roles.find(role => role.roleName === "TEACHER") &&      
          <Button
            variant=""
            className="coursesPage__content--button"
            onClick={addNewCourseHandler}
          >
            Добави курс
          </Button>
        }
    </div>
  );
};

export default Course;
