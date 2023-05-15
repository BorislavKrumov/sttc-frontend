import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AddCourse from "./pages/teacher/courses/AddCourse";
import Course from "./pages/teacher/courses/Course";
import UpdateCourse from "./pages/teacher/courses/UpdateCourse";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuizzesPage from "./pages/teacher/quizzes/QuizzesPage";
import AddQuiz from "./pages/teacher/quizzes/AddQuiz";
import UpdateQuiz from "./pages/teacher/quizzes/UpdateQuiz";
import Questions from "./pages/teacher/questions/Questions";
import AddQuestion from "./pages/teacher/questions/AddQuestion";
import UpdateQuestion from "./pages/teacher/questions/UpdateQuestion";
import UserProfilePage from "./pages/users/UserProfilePage";
import UserQuizzesPage from "./pages/users/UserQuizzesPage";
import UserQuizManualPage from "./pages/users/UserQuizManualPage";
import UserQuestionsPage from "./pages/users/UserQuestionsPage";
import UserQuizResultPage from "./pages/users/UserQuizResultPage";
import UsersPage from "./pages/admin/UsersPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/teacherCourse" element={<Course />} />
        <Route path="/teacherAddCourse" element={<AddCourse />} />
        <Route
          path="/updateCourse/:catId"
          element={<UpdateCourse />}
        />
        <Route path="/teacherQuizzes" element={<QuizzesPage />} />
        <Route path="/teacherAddQuiz" element={<AddQuiz />} />
        <Route path="/teacherUpdateQuiz/:quizId" element={<UpdateQuiz />} />
        <Route path="/teacherQuestions" element={<Questions />} />
        <Route path="/teacherAddQuestion" element={<AddQuestion />} />
        <Route
          path="/adminUpdateQuestion/:quesId"
          element={<UpdateQuestion />}
        />
        <Route path="/adminUsers" element={<UsersPage/>} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/quizzes" element={<UserQuizzesPage />} />
        <Route path="/quiz/*" element={<UserQuizzesPage />} />
        <Route path="/quizManual/" element={<UserQuizManualPage />} />
        <Route path="/questions/" element={<UserQuestionsPage />} />
        <Route path="/quizResults/" element={<UserQuizResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
