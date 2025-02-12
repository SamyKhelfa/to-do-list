import { useState } from "react";

type AddUserProps = {
  onConnectUser: (email: string) => void;
};

export const AuthForm = ({ onConnectUser }: AddUserProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnectUser(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="login"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};
