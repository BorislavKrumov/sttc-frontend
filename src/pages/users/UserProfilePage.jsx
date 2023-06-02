import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { fetchCourses } from "../../actions/coursesActions";
import { fetchQuizzes } from "../../actions/quizzesActions";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchCourses(dispatch, token);
  }, [dispatch]);

  useEffect(() => {
    fetchQuizzes(dispatch, token);
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = () => {
    // Implement the image upload logic here
    // and update the user's profile picture
  };

  return (
    <>
      {user && (
        <div className="userProfilePage__content">
          
              <Card.Title className="title">
                <h3>Добре дошли, {user.firstName}!</h3>
              </Card.Title>
              <Card className="userProfilePage__content--card userProfilePage__card">
                <Card.Body>
                  <Image
                    className="userProfilePage__content--profilePic"
                    roundedCircle
                    src={selectedImage ? URL.createObjectURL(selectedImage) : "images/user.png"}
                  />
                  <div className="userProfilePage__card-text">Моля, качете своя профилна снимка!</div>
                  <div className="userProfilePage__content--buttons">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <Button variant="dark" onClick={handleImageUpload}>
                      Качи снимка
                    </Button>
                  </div>
                  <Card.Text className="userProfilePage__card-text">
                    <strong>Име:</strong> {`${user.firstName} ${user.lastName}`}
                  </Card.Text>
                  <Card.Text className="userProfilePage__card-text">
                    <strong>Потребителско име:</strong> {user.username}
                  </Card.Text>
                  <Card.Text className="userProfilePage__card-text">
                    <strong>E-mail:</strong> {user.email}
                  </Card.Text>
                  <Card.Text className="userProfilePage__card-text">
                    <strong>Роля:</strong>{" "}
                    {user.roles.length > 0 ? user.roles[0]?.roleName : "User"}
                  </Card.Text>
                </Card.Body>
              </Card>
            
          
        </div>
      )}
    </>
  );
};

export default UserProfilePage;
