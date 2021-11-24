import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Header.css";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import AddTaskIcon from "@mui/icons-material/AddTask";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const { user, tasks, isLoading, tasksIsLoading } = useStateValue()[0];
  const onSignout = () => {
    auth.signOut();
  };

  if (isLoading) {
    return null;
  }
  
  if (tasksIsLoading) {
    return null;
  }
  
  const incompleteTasks = tasks?.filter((task) => task.createdByEmail !== user?.email && !task.completed);
  // console.log(user?.email,user);
  
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://aux.iconspalace.com/uploads/19504400291525966974.png"
          alt=""
        />
      </Link>
      {user && (
        <div className="header__profileInfo">
          <Link to="/submit">
            <AddTaskIcon className="header__profileInfoAddTaskIcon" />{" "}
          </Link>
          <div className="header__notificationImportant">
            {incompleteTasks.length > 0 && (
              <div className="header__notificationImportantTasksLength">
                {incompleteTasks.length}{" "}
              </div>
            )}
            <NotificationsOutlinedIcon />
          </div>

          <span className="header__profileInfoEmail">
            {user?.displayName}
          </span>
          <button onClick={onSignout} className="header__logout">
            <LogoutIcon />
            <div>Выйти</div>
          </button>
        </div>
      )}
      {!user && (
        <div className="header__authentication">
          <Link to="/signin">
            <Button type="submit" className="signin" variant="outlined">
              Войти
            </Button>
          </Link>
          <Link to="/register">
            <Button type="submit" variant="contained">
              Регистрация
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
