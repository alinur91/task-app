import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Todos from "./pages/Todos";
import Header from "./components/Header";
import FormInput from "./components/FormInput";
import { useEffect } from "react";
import db, { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer/authReducer";
import { Redirect } from "react-router-dom";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({ type: actionTypes.SET_LOADING, isLoading: true });

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // dispatch({ type: actionTypes.SET_USER, user: authUser });
        if (!authUser.displayName) {
          setTimeout(() => {
            dispatch({ type: actionTypes.SET_USER, user: authUser });
          }, 800);
        } else {
            dispatch({ type: actionTypes.SET_USER, user: authUser });
        }
      } else {
        dispatch({ type: actionTypes.SET_USER, user: null });
      }
      dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: actionTypes.TASKS_IS_LOADING, tasksIsLoading: true });
    db.collection("tasks")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: actionTypes.SET_TASKS, tasks });
        dispatch({ type: actionTypes.TASKS_IS_LOADING, tasksIsLoading: false });
      });
      
      
  }, [dispatch]);

    return (
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route path="/signin">
              {user && <Redirect to="/" />}
              {!user && <FormInput type="signin" />}
            </Route>
            <Route path="/register">
              {user && <Redirect to="/" />}
              {!user && <FormInput />}
            </Route>
            <Route path="/submit">
              {user && <AddTask />}
              {!user && <Redirect to="/" />}
            </Route>
            <Route path="/edit/:id">
              {user && <AddTask />}
              {!user && <Redirect to="/" />}
            </Route>
            <Route path="/">
              <TodoList />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

export default App;
