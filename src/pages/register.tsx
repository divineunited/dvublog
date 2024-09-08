import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // Register the user
      await axios.post("/api/auth/register", { username, password });

      // If registration is successful, immediately log the user in
      const loginResponse = await axios.post("/api/auth/login", {
        username,
        password,
      });
      login(loginResponse.data.token);

      // Redirect to the user's profile page
      router.push(`/${username}`);
    } catch (error) {
      console.error("Registration error", error);
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.message ||
            "An error occurred during registration."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
