import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import "./Todo.css";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";

export default function Todo({
  title,
  id,
  timestamp,
  description,
  createdBy,
  createdByEmail,
  onAuthorizationErr,
  completed,
  completedBy,
  completedTimestamp,
  updatedTimestamp,
  updatedBy,
}) {
  const { user } = useStateValue()[0];

  const handleRemove = async () => {
    if (user && user.email === createdByEmail) {
      await db.collection("tasks").doc(id).delete();
      return
    }
    if (user && !completed) {
       onAuthorizationErr('Вы не можете удалять не выполненные задачи!');
      return;
    } 
     if (user && user.email !== createdByEmail) {
       onAuthorizationErr("Задачу может удалять только тот,который ее создал!");
       return;
     }
      onAuthorizationErr(
        "У вас недостаточно полномочии чтобы выполнить эту операцию!Войдите в систему!"
      );
  };

  // const handleClick = () => {
  //   if (!user) onAuthorizationErr(
  //     "У вас недостаточно полномочии чтобы выполнить эту операцию!Войдите в систему!"
  //   );
  // };

  return (
    <div  className={`todo ${false && `todo-completed`}`}>
      <Link to={`/edit/${id}`} className="todo__right">
        {/* <DoneOutlinedIcon className={`${!completed && `done-iconHidden`} `} /> */}

        <img
          className={`done-icon ${!completed && `done-iconHidden`} `}
          src="https://www.shareicon.net/data/512x512/2015/09/24/106380_add_512x512.png"
        />

        <div className="title-date">
          <h3>{title} </h3>
          <h4>{description} </h4>
          <p>
            Создал(а) <span className="todo_created-userName">{createdBy}</span>
            ,
            {new Date(timestamp).toLocaleString("ru", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            {new Date(timestamp).toLocaleTimeString("en-US", { hour12: false })}{" "}
          </p>
          {updatedTimestamp && (
            <p>
              {" "}
              Редактировал(а){" "}
              <span className="todo_created-userName">{updatedBy}</span>,
              {new Date(updatedTimestamp).toLocaleString("ru", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {new Date(updatedTimestamp).toLocaleTimeString("en-US", {
                hour12: false,
              })}{" "}
            </p>
          )}
          {completedTimestamp ? (
            <p>
              Выполнел(а){" "}
              <span className="todo_created-userName">{completedBy}</span>,
              {new Date(completedTimestamp).toLocaleString("ru", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              {new Date(completedTimestamp).toLocaleTimeString("en-US", {
                hour12: false,
              })}{" "}
            </p>
          ) : (
            <p>Задача не выполнена </p>
          )}
        </div>
      </Link>

      <ClearIcon onClick={handleRemove} />
    </div>
  );
}
