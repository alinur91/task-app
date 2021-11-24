import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import db from "../firebase";
import { useHistory, useParams } from "react-router";
import firebase from "firebase";
import { useStateValue } from "../StateProvider";
import "./AddTask.css";
import { Link } from "react-router-dom";

export default function AddTask() {
  const { user, tasks } = useStateValue()[0];
  const history = useHistory();
  const { id } = useParams();
  const forEditTask = tasks.find((t) => t.id === id);

  const [titleError, settitleError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [completed, setcompleted] = useState(forEditTask?.completed);

  const [titleValue, settitleValue] = useState(
    forEditTask?.title ? forEditTask?.title : ""
  );

  const [descriptionValue, setdescriptionValue] = useState(
    forEditTask?.description ? forEditTask?.description : ""
  );

  const titleValueIsInValid = () =>
    titleValue.trim().length <= 2 || titleValue.trim().length >= 46;

  const descriptionValueIsInValid = () =>
    descriptionValue.trim().length <= 4 || descriptionValue.trim().length >= 64;

  // console.log(forEditTask);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (titleValueIsInValid()) {
      settitleError(true);
      return;
    }

    if (descriptionValueIsInValid()) {
      setdescriptionError(true);
      return;
    }

    if (history.location.pathname === "/submit") {
      db.collection("tasks").add({
        title: titleValue,
        createdBy: user?.displayName,
        createdByEmail: user?.email,
        description: descriptionValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        completed: false,
      });
    } else {
      let updatedTimestamp = forEditTask.updatedTimestamp || null;
      let updatedBy = forEditTask.updatedBy || null;
      if (
        forEditTask?.title !== titleValue.trim() ||
        forEditTask?.description !== descriptionValue.trim() ||
        completed
      ) {
        if (!completed) {
          updatedTimestamp = firebase.firestore.FieldValue.serverTimestamp();
          updatedBy = user.displayName;
        }

        db.collection("tasks")
          .doc(id)
          .update({
            title: titleValue,
            description: descriptionValue,
            updatedTimestamp,
            updatedBy,
            completed,
            completedBy: completed ? user.displayName : null,
            completedTimestamp: completed
              ? firebase.firestore.FieldValue.serverTimestamp()
              : null,
          });
      }
    }
    history.push("/");
  };

  useEffect(() => {
    return () => {
      settitleValue("");
      setdescriptionValue("");
    };
  }, [history.location]);

  const handleTitleChange = (e) => {
    settitleValue(e.target.value);
    settitleError(false);
  };

  const handleDescriptionChange = (e) => {
    setdescriptionValue(e.target.value);
    setdescriptionError(false);
  };

  const descriptionClasses = !descriptionError
    ? "form-control"
    : "form-control invalid";

    // if(isLoading) return null

  return (
    <div className="add-tasks">
      <h2>{forEditTask ? "Редактировать задачу" : "Новая задача"}</h2>
      {forEditTask && (
        <div className="task-edit__completed">
          <label htmlFor="completed">Отметить как выполненное</label>
          <input
            disabled={forEditTask.completed}
            onChange={(e) => setcompleted(e.target.checked)}
            value={completed}
            checked={completed}
            id="completed"
            type="checkbox"
          />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={`add-tasks__form ${titleError && `validation-error`}`}
      >
        <label htmlFor="title">Заголовок:</label>
        <input
          disabled={
            (forEditTask && forEditTask.createdByEmail !== user.email) ||
            forEditTask?.completed
          }
          onChange={handleTitleChange}
          name="titleValue"
          value={titleValue}
          placeholder="Задача на выполнение"
          id="title"
          type="text"
        />
        <div className={descriptionClasses}>
          <label htmlFor="description">Описание:</label>
          <textarea
            disabled={
              (forEditTask && forEditTask.createdByEmail !== user.email) ||
              forEditTask?.completed
            }
            onChange={handleDescriptionChange}
            value={descriptionValue}
            name="descriptionValue"
            placeholder="Описание задачи"
            id="description"
            cols="30"
            rows="10"
          ></textarea>
          {descriptionError && <p>Длина описание должна быть 5-65 символов!</p>}
        </div>
        {titleError && <p>Длина заголовка должна быть 3-25 символов!</p>}
        <Button
          disabled={forEditTask?.completed}
          className="btn-save"
          type="submit"
          variant="contained"
        >
          {" "}
          Сохранить{" "}
        </Button>
        <Link to="/">
          <Button className="btn-back" type="submit" variant="contained">
            {" "}
            Назад{" "}
          </Button>
        </Link>
      </form>
    </div>
  );
}
