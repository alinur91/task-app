import React, { useState } from "react";
import { auth } from "../firebase";
import { useHistory, useLocation } from "react-router";
import "./FormInput.css";

export default function FormInput({ type }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const history = useHistory();
  const location = useLocation();

  const handleClick = async (e) => {
    e.preventDefault();
    if (location.pathname === "/register") {
      try {
        if (username.trim().length >= 2 && username.trim().length <= 9) {
          const authUser = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
          authUser.updateProfile({
            displayName: username,
          });
          return;
        }
        alert("Никнэйм должен быть 2-9 символов!");
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const authUser = await auth.signInWithEmailAndPassword(email, password);
        if (authUser) {
          history.push("/");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>{type === "signin" ? "Войти" : "Регистрация"}</h1>
        <form>
          {type !== "signin" && (
            <>
              {" "}
              <h5>Никнэйм</h5>
              <input
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />{" "}
            </>
          )}
          <h5>Электронная почта</h5>
          <input value={email} onChange={(e) => setemail(e.target.value)} />
          <h5>Пароль</h5>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
          />
          <button onClick={handleClick} className="login__signInButton">
            {type === "signin" ? "Войти" : "Зарегестрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
}
