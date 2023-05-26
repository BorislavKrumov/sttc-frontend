import React, { useEffect, useState } from "react";
import "./UsersPage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUser } from "../../actions/userActions";
import { Container  } from "react-bootstrap";
import { UserCard } from "../../components/UserCard";
import * as userConstants from "../../constants/usersConstants";
import swal from "sweetalert";

const UsersPage = () => {
    const usersReducer = useSelector((state) => state.usersReducer);
    const [users, setUsers] = useState(usersReducer.users || []);
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("jwtToken"));

    useEffect(() => {
      fetchUsers(dispatch, token).then((data) => {
        const users = data.payload;
        setUsers(users);
      })
    },[]);

    const handleUpdate = (user) => {
      user = {
        ...user,
        roles: [{
          roleName: user.role,
          roleDescription: user.role
        }]
      }
      updateUser(dispatch, user, token).then((data) => {
        if (data.type === userConstants.UPDATE_USERS_SUCCESS) {
          swal("Данните на потребителя са обновени!", `Обновяването на потребител с име ${user.firstName} е успешно!`, "success");
        } else {
          swal("Данните на потребителя НЕ са обновени!", `Обновяването на потребител с име ${user.firstName} НЕ е успешно!`, "error");
        }        
      });
    
        console.log("Обновяване на потребител с идентификатор:", user.userId);
      };

    return (
      <div className="quizzesPage__content">
      <Container>
      <div className="usersPage__header">
          <h2>Потребители: </h2>
        </div>
        <div className="row">
          {users.map((user) => <UserCard key={user.userId} user={user} handleUpdate={handleUpdate}/>)}
        </div>
      </Container>
      </div>
    );
};

export default UsersPage;
