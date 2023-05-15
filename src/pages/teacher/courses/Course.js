import React, { useEffect, useState } from "react";
import "./Course.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Sidebar from "../../../components/Sidebar";
import {
  deleteCategory,
  fetchCategories,
} from "../../../actions/categoriesActions";
import swal from "sweetalert";

const Course = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const [categories, setCategories] = useState(categoriesReducer.categories);

  const categoryClickHandler = (catId) => {
    navigate(`/teacherQuizzes/?catId=${catId}`);
  };

  const addNewCategoryHandler = () => {
    navigate("/teacherAddCourse");
  };

  const updateCategoryHandler = (event, category) => {
    event.stopPropagation();
    navigate(`/adminUpdateCategory/${category.catId}/`);
  };

  const deleteCategoryHandler = (event, category) => {
    event.stopPropagation();
    swal({
      title: "Сигурен ли си?",
      text: "След като бъде изтрит, няма да можете да възстановите този курс!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCategory(dispatch, category.catId, token).then((data) => {
          if (data.type === categoriesConstants.DELETE_CATEGORY_SUCCESS) {
            swal(
              "Курсът е изтрит",
              `${category.title} е успешно изтрит`,
              "success"
            );
          } else {
            swal(
              "Курсът не е изтрит!",
              `${category.title} не е изтрито`,
              "error"
            );
          }
        });
      } else {
        swal(`${category.title} е в безопастност`);
      }
    });
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
  }, []);

  return (
    <div className="coursesPage__container">
      <div className="coursesPage__sidebar">
        <Sidebar />
      </div>
      <div className="coursesPage__content">
        <h2>Курсове</h2>
        {categories ? (
          categories.length === 0 ? (
            <Message>
              Няма налични курсове. Опитайте да добавите някой курс.
            </Message>
          ) : (
            categories.map((cat, index) => {
              return (
                <ListGroup
                  className="coursesPage__content--categoriesList"
                  key={index}
                >
                  <ListGroup.Item
                    style={{ borderWidth: "0px" }}
                    className="d-flex"
                    onClick={() => categoryClickHandler(cat.catId)}
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{cat.title}</div>
                      {cat.description}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        height: "90%",
                        margin: "auto 2px",
                      }}
                    >
                      <div
                        onClick={(event) => updateCategoryHandler(event, cat)}
                        style={{
                          margin: "2px 8px",
                          textAlign: "center",
                          color: "rgb(68 177 49)",
                          fontWeight: "500",
                          cursor:"pointer"
                        }}
                      >{`Обнови`}</div>

                      <div
                        onClick={(event) => deleteCategoryHandler(event, cat)}
                        style={{
                          margin: "2px 8px",
                          textAlign: "center",
                          color: "red",
                          fontWeight: "500",
                          cursor:"pointer"
                        }}
                      >{`Изтрий`}</div>
                    </div>
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
          className="coursesPage__content--button"
          onClick={addNewCategoryHandler}
        >
          Добави курс
        </Button>
      </div>
    </div>
  );
};

export default Course;
