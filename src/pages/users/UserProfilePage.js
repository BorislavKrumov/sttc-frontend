import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { fetchCategories } from "../../actions/categoriesActions";
import { fetchQuizzes } from "../../actions/quizzesActions";
import Sidebar from "../../components/Sidebar";
import "./UserProfilePage.css";
const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  useEffect(() => {
    fetchCategories(dispatch, token);
  }, [dispatch]);

  useEffect(() => {
    fetchQuizzes(dispatch, token);
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  return (
    <div className="userProfilePage__container">
      <div className="userProfilePage__sidebar">
        <Sidebar />
      </div>
      {user && (
        <div className="userProfilePage__content">
          <Image
            className="userProfilePage__content--profilePic"
            width="20%"
            height="20%"
            roundedCircle
            src="images/user.png"
          />

          <Table bordered className="userProfilePage__content--table">
            <tbody>
              <tr>
                <td>Име:</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
              </tr>
              <tr>
                <td>Потребителско име:</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>Е-mail:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Роля:</td>
                <td>{user.roles.length > 0 ? user.roles[0]?.roleName : "User"}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
