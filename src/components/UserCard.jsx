import { useState } from "react";
import { Card, Button  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';


export const UserCard = ({user, handleUpdate}) => {
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState((user.roles || []).map((r) => r.roleName).join(", "));
    const [active, setActive] = useState(user.active);

    
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleActiveChange = () => {
    setActive(!active);
  };


    return <div className="col-md-6">
        <Card key={user.userId} className="mb-3">
        <Card.Body>
            <Card.Title>Име: <span className="user-firstName">{user.firstName}</span></Card.Title>
            <Card.Text><strong>Фамилия: </strong>{user.lastName}</Card.Text>
            <Card.Text><strong>Потребителско име: </strong>{user.username}</Card.Text>
            <Card.Text>
            <strong>Роля: </strong>
            <Form.Select className="form-control" value={role} onChange={handleRoleChange} >
              <option value="ADMIN">ADMIN </option>
              <option value="TEACHER">TEACHER</option>
              <option value="USER">USER</option>
            </Form.Select>
          </Card.Text>
          <Card.Text>
            <strong>E-mail: </strong>
            <input className="form-control" type="email" value={email} onChange={handleEmailChange} />
          </Card.Text>
            <Card.Text>
            <strong>Статус: </strong>
            <Form.Select className="form-control" value={active} onChange={handleActiveChange}>
              <option value={true}>АКТИВЕН</option>
              <option value={false}>НЕАКТИВЕН</option>
            </Form.Select>
            </Card.Text>
            <div className="button-container">
            <Button style={{ backgroundColor: "#00202B", color: "white"}} variant="dark" onClick={() => handleUpdate({...user, userId: user.userId, email, role, active})}>
                Обнови
            </Button>
            </div>
        </Card.Body>
        </Card>
    </div>

}