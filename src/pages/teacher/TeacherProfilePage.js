import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SidebarTeacher from "../../components/SidebarTeacher";
import "./TeacherProfilePage.css";
import Image from "react-bootstrap/Image";
import { fetchCategories } from "../../actions/categoriesActions";
import { fetchQuizzes } from "../../actions/quizzesActions";

const TeacherProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    fetchCategories(dispatch, token);
  }, [dispatch]);

  useEffect(() => {
    fetchQuizzes(dispatch, token);
  }, [dispatch]);

  return (
    <div className="adminProfilePage__container">
      <div className="adminProfilePage__sidebar">
        <SidebarTeacher />
      </div>
      <div className="adminProfilePage__content">
        <Image
          className="adminProfilePage__content--profilePic"
          width="20%"
          height="20%"
          roundedCircle
          src="images/user.png"
        />

        <Table bordered className="adminProfilePage__content--table">
          <tbody>
            <tr>
              <td>Име</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
            </tr>
            <tr>
              <td>Потребителско име</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>E-mail</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Роля</td>
              <td>{user.roles.length ? user.roles[0]?.roleName : "User"}</td>
            </tr>
            <tr>
              <td>Статус</td>
              <td>{`${user.active}`}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TeacherProfilePage;