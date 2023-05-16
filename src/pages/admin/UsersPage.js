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
        <div className="quizzesPage__container">
        <div className="quizzesPage__sidebar">
            <Sidebar />
        </div>
        <div className="quizzesPage__content">
        <Container>
          <h2>Потребители</h2>
          {users.map((user) => (
            <Card key={user.id} className="mb-3">
              <Card.Body>
                <Card.Title>Име: {user.firstName}</Card.Title>
                <Card.Text>Фамилия: {user.lastName}</Card.Text>
                <Card.Text>
                 Роля: {(user.roles || []).map((r) => r.roleName).join(", ")}
                </Card.Text>
                <Card.Text>E-mail: {user.email}</Card.Text>
                <Card.Text>
                Статус: <span className={user.enabled ? "true" : "false"}>
                    {user.enabled ? "АКТИВЕН" : "НЕАКТИВЕН"}
                  </span>
                </Card.Text>
                <Button variant="primary" onClick={() => handleUpdate(user.id)}>
                  Обнови
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Container>
        </div>
        </div>
    );
};

export default UsersPage;
