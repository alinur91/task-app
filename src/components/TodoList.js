import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Todo from "./Todo";
import LoadingSpinner from '../UI/LoadingSpinner'
import "./TodoList.css";

export default function TodoList() {
  const { tasks, tasksIsLoading,user } = useStateValue()[0];
  const [authorizationErr, setauthorizationErr] = useState(false);
  
  useEffect(() => {
    setauthorizationErr(false)
  }, [tasks]);

  const onAuthorizationErr = (message) => {
    setauthorizationErr(message);
  };


  return (
    <div className="container">
      {tasksIsLoading ? (
        <LoadingSpinner />
      ) : tasks.length < 1 ? (
        <div>
          {" "}
          <h2>Задачи еще не созданы!</h2>{" "}
          {user ? (
            <Link className="add-task-link" to="/submit">
              Перейти на страницу для создание задачи.
            </Link>
          ) : (
            <>
              <Link className="add-task-link" to="/signin">
                Войдите в систему,чтобы создавать задачи!
              </Link>
              <Link className="add-task-link" to="/register">
                Нет аккаунта? Перейти на страницу регистрации.
              </Link>
            </>
          )}
        </div>
      ) : (
        <>
          <h1>Задачи на выполнение </h1>
          <div className="tasks">
            {tasks.map((task) => (
              <Todo
                key={task.id}
                {...task}
                onAuthorizationErr={onAuthorizationErr}
              />
            ))}
          </div>
          {authorizationErr && <p>{authorizationErr}</p>}
        </>
      )}
    </div>
  );
}
