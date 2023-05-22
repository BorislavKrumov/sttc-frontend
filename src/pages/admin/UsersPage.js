import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./UsersPage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/userActions";
import { Card, Container, Button  } from "react-bootstrap";

const UsersPage = () => {
    const usersReducer = useSelector((state) => state.usersReducer);
    const [users, setUsers] = useState(usersReducer.users);
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("jwtToken"));

    useEffect(() => {
        fetchUsers(dispatch, token).then((data) => {
        const users = data.payload;
        setUsers(users);
        })
    },[]);

    const handleUpdate = (userId) => {
        // Обнови данните за потребителя
        
        console.log("Обновяване на потребител с идентификатор:", userId);
      };

    return (
      <div className="quizzesPage__content">
      <Container>
      <div className="usersPage__header">
          <h2>Потребители: </h2>
        </div>
        <div className="row">
        {users.map((user) => (
          <div className="col-md-6" key={user.id}>
          <Card key={user.id} className="mb-3">
            <Card.Body>
              <Card.Title>Име: <span className="user-firstName">{user.firstName}</span></Card.Title>
              <Card.Text><strong>Фамилия: </strong>{user.lastName}</Card.Text>
              <Card.Text>
              <strong>Роля: </strong>
                {(user.roles || []).map((r) => r.roleName).join(", ")}
              </Card.Text>
              <Card.Text><strong>E-mail: </strong>{user.email}</Card.Text>
              <Card.Text>
              <strong>Статус: </strong><span className={user.enabled ? "true" : "false"}>
                  {user.enabled ? "АКТИВЕН" : "НЕАКТИВЕН"}
                </span>
              </Card.Text>
              <div className="button-container">
                <Button variant="dark" onClick={() => handleUpdate(user.id)}>
                  Обнови
                </Button>
              </div>
            </Card.Body>
          </Card>
          </div>
        ))}
        </div>
      </Container>
      </div>
    );
};

export default UsersPage;
