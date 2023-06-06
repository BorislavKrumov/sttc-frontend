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
import Sidebar from "./components/Sidebar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMoon, faRocket } from "@fortawesome/free-solid-svg-icons";
library.add(faMoon, faRocket);

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>

        <Route 
          path="/profile"
          element={
            <ProtectedRoute roles={["USER", "TEACHER", "ADMIN"]}>
              <Sidebar> 
                <UserProfilePage /> 
              </Sidebar> 
            </ProtectedRoute>
          }
        />

        <Route path="/teacherCourse" element={<ProtectedRoute roles={["TEACHER", "USER"]}> <Sidebar> <Course /> </Sidebar> </ProtectedRoute>} />
        <Route path="/teacherAddCourse" element={<ProtectedRoute roles={["TEACHER"]}> <Sidebar> <AddCourse /> </Sidebar> </ProtectedRoute>} />
        <Route path="/updateCourse/:courseId" element={<ProtectedRoute roles={["TEACHER"]}> <Sidebar> <UpdateCourse /> </Sidebar> </ProtectedRoute>} />
        <Route path="/teacherQuizzes" element={<ProtectedRoute roles={["TEACHER"]}> <Sidebar> <QuizzesPage /> </Sidebar> </ProtectedRoute>} />
        <Route path="/teacherAddQuiz" element={<ProtectedRoute roles={["TEACHER"]}> <Sidebar> <AddQuiz /> </Sidebar> </ProtectedRoute>} />
        <Route path="/teacherUpdateQuiz/:quizId" element={<ProtectedRoute roles={["TEACHER"]}> <Sidebar> <UpdateQuiz /> </Sidebar> </ProtectedRoute>} />
        <Route path="/teacherQuestions" element={<ProtectedRoute roles={["TEACHER"]}> <Sidebar> <Questions /> </Sidebar> </ProtectedRoute>} />
        <Route path="/teacherAddQuestion" element={<ProtectedRoute roles={["TEACHER"]}> <Sidebar> <AddQuestion /> </Sidebar> </ProtectedRoute>} />

        <Route path="/adminUpdateQuestion/:quesId" element={<ProtectedRoute roles={["ADMIN", "TEACHER"]}> <Sidebar> <UpdateQuestion /> </Sidebar> </ProtectedRoute>} />
        <Route path="/adminUsers" element={<ProtectedRoute roles={["ADMIN"]}> <Sidebar> <UsersPage /> </Sidebar> </ProtectedRoute>} />

        <Route path="/quizzes" element={<ProtectedRoute roles={["USER"]}> <Sidebar> <UserQuizzesPage /> </Sidebar> </ProtectedRoute>} />
        <Route path="/quiz/*" element={<ProtectedRoute roles={["USER"]}> <Sidebar> <UserQuizzesPage /> </Sidebar> </ProtectedRoute>} />
        <Route path="/quizManual/" element={<ProtectedRoute roles={["USER"]}> <Sidebar> <UserQuizManualPage /> </Sidebar> </ProtectedRoute>} />
        <Route path="/questions/" element={<ProtectedRoute roles={["USER"]}> <Sidebar> <UserQuestionsPage /> </Sidebar> </ProtectedRoute>} />
        <Route path="/quizResults/" element={<ProtectedRoute roles={["USER"]}> <Sidebar> <UserQuizResultPage /> </Sidebar> </ProtectedRoute>} />
        <Route path="*" element={<LoginPage />} />     
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
