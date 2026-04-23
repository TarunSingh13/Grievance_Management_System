import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import BASE_URL from "../api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/login`, form);

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-2xl w-96 border border-yellow-600">
        <h2 className="text-3xl text-yellow-400 text-center mb-6">Login</h2>

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-gray-800 text-white rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-gray-800 text-white rounded"
        />

        <button className="w-full bg-yellow-500 text-black p-3 rounded">
          Login
        </button>

        <p className="text-gray-400 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-400">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;