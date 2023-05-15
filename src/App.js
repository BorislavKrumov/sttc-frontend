import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AddCourse from "./pages/teacher/courses/AddCourse";
import TeacherCourse from "./pages/teacher/courses/TeacherCourse";
import AdminUpdateCategoryPage from "./pages/teacher/courses/UpdateCourse";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import TeacherProfilePage from "./pages/teacher/TeacherProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminQuizzesPage from "./pages/admin/quizzes/AdminQuizzesPage";
import AdminAddQuiz from "./pages/admin/quizzes/AdminAddQuiz";
import AdminUpdateQuiz from "./pages/admin/quizzes/AdminUpdateQuiz";
import AdminQuestionsPage from "./pages/teacher/questions/AdminQuestionsPage";
import AdminAddQuestionsPage from "./pages/teacher/questions/AdminAddQuestionsPage";
import AdminUpdateQuestionPage from "./pages/teacher/questions/AdminUpdateQuestionPage";
import UserProfilePage from "./pages/users/UserProfilePage";
import UserQuizzesPage from "./pages/users/UserQuizzesPage";
import UserQuizManualPage from "./pages/users/UserQuizManualPage";
import UserQuestionsPage from "./pages/users/UserQuestionsPage";
import UserQuizResultPage from "./pages/users/UserQuizResultPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/adminProfile" element={<AdminProfilePage />} />
        <Route path="/teacherProfile" element={<TeacherProfilePage />} />
        <Route path="/teacherCourse" element={<TeacherCourse />} />
        <Route path="/teacherAddCourse" element={<AddCourse />} />
        <Route
          path="/adminUpdateCategory/:catId"
          element={<AdminUpdateCategoryPage />}
        />
        <Route path="/teacherQuizzes" element={<AdminQuizzesPage />} />
        <Route path="/teacherAddQuiz" element={<AdminAddQuiz />} />
        <Route path="/teacherUpdateQuiz/:quizId" element={<AdminUpdateQuiz />} />
        <Route path="/teacherQuestions" element={<AdminQuestionsPage />} />
        <Route path="/teacherAddQuestion" element={<AdminAddQuestionsPage />} />
        <Route
          path="/adminUpdateQuestion/:quesId"
          element={<AdminUpdateQuestionPage />}
        />
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
