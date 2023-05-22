import { useState } from "react";
import { Card, Button  } from "react-bootstrap";

export const UserCard = ({user, handleUpdate}) => {
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState((user.roles || []).map((r) => r.roleName).join(", "));
    const [active, setActive] = useState(user.active);

    return <div className="col-md-6">
        <Card key={user.userId} className="mb-3">
        <Card.Body>
            <Card.Title>Име: <span className="user-firstName">{user.firstName}</span></Card.Title>
            <Card.Text><strong>Фамилия: </strong>{user.lastName}</Card.Text>
            <Card.Text><strong>Потребителско име: </strong>{user.username}</Card.Text>
            <Card.Text>
            <strong>Роля: </strong>
            {role}
            </Card.Text>
            <Card.Text><strong>E-mail: </strong>{email}</Card.Text>
            <Card.Text>
            <strong>Статус: </strong><span className={active ? "true" : "false"}>
                {active ? "АКТИВЕН" : "НЕАКТИВЕН"}
            </span>
            </Card.Text>
            <div className="button-container">
            <Button variant="dark" onClick={() => handleUpdate({...user, userId: user.userId, email, roles: [role], active})}>
                Обнови
            </Button>
            </div>
        </Card.Body>
        </Card>
    </div>

}