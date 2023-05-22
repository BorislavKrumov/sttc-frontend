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
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/profile" element={<ProtectedRoute roles={["USER", "TEACHER", "ADMIN"]}> <UserProfilePage /> </ProtectedRoute>} />

        <Route path="/teacherCourse" element={<ProtectedRoute roles={["TEACHER"]}> <Course /> </ProtectedRoute>} />
        <Route path="/teacherAddCourse" element={<ProtectedRoute> <AddCourse roles={["TEACHER"]}/> </ProtectedRoute>} />
        <Route path="/updateCourse/:catId" element={<ProtectedRoute> <UpdateCourse roles={["TEACHER"]}/> </ProtectedRoute>} />
        <Route path="/teacherQuizzes" element={<ProtectedRoute> <QuizzesPage roles={["TEACHER"]}/> </ProtectedRoute>} />
        <Route path="/teacherAddQuiz" element={<ProtectedRoute> <AddQuiz roles={["TEACHER"]}/> </ProtectedRoute>} />
        <Route path="/teacherUpdateQuiz/:quizId" element={<ProtectedRoute roles={["TEACHER"]}> <UpdateQuiz /> </ProtectedRoute>} />
        <Route path="/teacherQuestions" element={<ProtectedRoute roles={["TEACHER"]}> <Questions /> </ProtectedRoute>} />
        <Route path="/teacherAddQuestion" element={<ProtectedRoute roles={["TEACHER"]}> <AddQuestion /> </ProtectedRoute>} />

        <Route path="/adminUpdateQuestion/:quesId" element={<ProtectedRoute roles={["ADMIN"]}> <UpdateQuestion /> </ProtectedRoute>} />
        <Route path="/adminUsers" element={<ProtectedRoute> <UsersPage roles={["ADMIN"]}/> </ProtectedRoute>} />

        <Route path="/quizzes" element={<ProtectedRoute roles={["USER"]}> <UserQuizzesPage /> </ProtectedRoute>} />
        <Route path="/quiz/*" element={<ProtectedRoute roles={["USER"]}> <UserQuizzesPage /> </ProtectedRoute>} />
        <Route path="/quizManual/" element={<ProtectedRoute roles={["USER"]}> <UserQuizManualPage /> </ProtectedRoute>} />
        <Route path="/questions/" element={<ProtectedRoute roles={["USER"]}> <UserQuestionsPage /> </ProtectedRoute>} />
        <Route path="/quizResults/" element={<ProtectedRoute roles={["USER"]}> <UserQuizResultPage /> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
