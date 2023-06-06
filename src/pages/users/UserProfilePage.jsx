import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { fetchCourses } from "../../actions/coursesActions";
import { fetchQuizzes } from "../../actions/quizzesActions";
import "./UserProfilePage.css";
import axios from "axios";
import { fetchUsers } from "../../actions/userActions";
import swal from "sweetalert";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const [selectedImage, setSelectedImage] = useState(null);
  const [isFromApi, setIsFromApi] = useState(false);

  useEffect(() => {
    fetchCourses(dispatch, token);
  }, [dispatch]);

  useEffect(() => {
    fetchQuizzes(dispatch, token);
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    fetchUsers(dispatch, token).then((data) => {
      const users = data.payload;
      console.log(users)
      const avatar = users.find(u => u.userId === user.userId).imageB64;
      setSelectedImage(avatar);
      setIsFromApi(true);
    })
  },[]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setIsFromApi(false);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('id', user.userId);
  
    try {
      const response = await axios.patch("/api/manage/users", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      swal(
        "Снимката е качена успешно!",
        ``,
        "success"
      );

      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
      swal(
        "Снимката не е качена успешно!",
        ``,
        "error"
      );
    }
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
                    src={selectedImage ? isFromApi ? `data:image/jpeg;base64,${selectedImage}` : URL.createObjectURL(selectedImage) : "images/user.png"}
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
