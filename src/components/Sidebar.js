import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { MdQuiz, MdQueue } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../actions/categoriesActions";
import { TbLayoutGrid, TbReport, TbLayoutGridAdd } from "react-icons/tb";

const userLinks = [
  {
    path: "/profile",
    name: "Профил",
    icon: <FaUserAlt />,
  },
  {
    path: "/quizResults",
    name: "Информация",
    icon: <TbReport />,
  },
  {
    path: "/quizzes",
    name: "Всички тестове",
    icon: <MdQuiz />,
  },
];

const adminLinks = [{
  path: "/profile",
  name: "Профил",
  icon: <FaUserAlt />,
},
{
  path: "/adminUsers",
  name: "Потребители",
  icon: <MdQueue />,
}];

const teacherLinks = [{
  path: "/profile",
  name: "Профил",
  icon: <FaUserAlt />,
},
{
  path: "/teacherCourse",
  name: "Курсове",
  icon: <TbLayoutGrid />,
},
{
  path: "/teacherAddCourse",
  name: "Добави курс",
  icon: <TbLayoutGridAdd />,
},
{
  path: "/teacherQuizzes",
  name: "Тестове",
  icon: <MdQuiz />,
},
{
  path: "/teacherAddQuiz",
  name: "Добави",
  icon: <MdQueue />,
},
];

const Sidebar = ({ children }) => {
  const loginReducer = useSelector((state) => state.loginReducer);
  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const [categories, setCategories] = useState(categoriesReducer.categories);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const [menuItems, setMenuItems] = useState([
    {
      path: "/profile",
      name: "Профил",
      icon: <FaUserAlt />,
    },
    {
      path: "/quizResults",
      name: "Информация",
      icon: <TbReport />,
    },
    {
      path: "/quizzes",
      name: "Всички тестове",
      icon: <MdQuiz />,
    },
  ]);

  useEffect(() => {
    const {loggedIn, user} = loginReducer;
    if (!loggedIn) {
      return;
    }

    if (user.roles.length === 0) {
      setMenuItems(userLinks);
      return;
    }
    
    switch(user.roles[0].roleName) {
      case "ADMIN":
        setMenuItems(adminLinks);
        break;
      case "TEACHER":
        setMenuItems(teacherLinks);
        break;
      case "USER":
        setMenuItems(userLinks);
        break;
    }
  }, [loginReducer])
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // useEffect(() => {
  //   console.log("Fetching Categories because of Sidebar");
  //   fetchCategories(dispatch, token).then((data) => {
  //     const tempCategories = data.payload;
  //     setCategories(tempCategories);

  //     const newMenuItems = tempCategories.map((c) => {
  //       return {
  //         path: `/quiz/cat${c.title}?catId=${c.catId}`,
  //         name: c.title,
  //         icon: <TbLayoutGrid />,
  //       };
  //     });
  //     setMenuItems([...menuItems, ...newMenuItems]);
  //   });
  // }, []);

  return (
    <div
      className="container"
      style={{ display: "flex", width: "auto", margin: "0px", padding: "0px" }}
    >
      <div style={{ width: isOpen ? "12em" : "3em" }} className="sidebar">
        <div className="top_section">
          { <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Меню
          </h1> }
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="sidemenulink"
            activeclassname="sidemenulink-active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
