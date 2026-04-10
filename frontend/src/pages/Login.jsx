import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login("demo-token", {
      name: "Demo User",
      email,
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <input
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;