import { useState, useEffect } from "react";
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

  useEffect(() => {
    const user = localStorage.getItem("user") || "";

    if (USERS.includes(user)) {
      setIsLogged(true);
    }
  }, []);

  const onLogin = (email: string) => {
    if (USERS.includes(email)) {
      localStorage.setItem("user", email);
      setIsLogged(true);
    } else {
      alert("User not found");
    }
  };

  const onLogout = () => {
    localStorage.removeItem("user");
    setIsLogged(false);
  };

  if (isLogged) {
    return (
      <div>
        <div>
          <button onClick={onLogout}>Logout</button>
        </div>
        <Tasks />
      </div>
    );
  }

  return <AuthForm onConnectUser={onLogin} />;
}

export default App;
