import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { loginReducer, registerReducer } from "./reducers/authReducer";
import { coursesReducer } from "./reducers/coursesReducer";
import { questionsReducer } from "./reducers/questionsReducer";
import { quizResultReducer } from "./reducers/quizResultReducer";
import { quizzesReducer } from "./reducers/quizzesReducer";
import { usersReducer } from "./reducers/usersReducer";

const reducer = combineReducers({
  loginReducer: loginReducer,
  registerReducer: registerReducer,
  coursesReducer: coursesReducer,
  usersReducer: usersReducer,
  quizzesReducer: quizzesReducer,
  questionsReducer: questionsReducer,
  quizResultReducer: quizResultReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
