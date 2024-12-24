import { useState } from "react";
import "./App.css";
import { Tasks } from "./components/Tasks";
import { AuthForm } from "./components/AuthForm";

const USERS = [
  "jean@gmail.com",
  "john@gmail.com",
  "samy@gmail.com",
  "bryan@gmail.com",
];

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const onLogin = (email: string) => {
    if (USERS.includes(email)) {
      localStorage.setItem("user", "true");
      setIsLogged(true);
    } else {
      alert("User not found");
    }
  };

  if (isLogged) {
    return <Tasks />;
  }

  return <AuthForm onConnectUser={onLogin} />;
}

export default App;

// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
