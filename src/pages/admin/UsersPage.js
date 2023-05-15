import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./UsersPage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/userActions";

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

    return (
        <div className="quizzesPage__container">
        <div className="quizzesPage__sidebar">
            <Sidebar />
        </div>
        <div className="quizzesPage__content">
            <h2>Потребители</h2>
            {users.map(user => (
                <div key={user.id}>
                    <div>{user.firstName}</div>
                    <div>{user.lastName}</div>
                    <div>{(user.roles || []).map(r => r.roleName).join(", ")}</div>
                    <div>{user.email}</div>
                    <div>{user.enabled ? "АКТИВЕН" : "НЕАКТИВЕН"}</div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default UsersPage;
