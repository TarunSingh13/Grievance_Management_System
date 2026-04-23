import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // 🔹 handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", form);

      // save token
      localStorage.setItem("token", res.data.token);

      // redirect
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96 border border-yellow-600"
      >

        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          Welcome Back
        </h2>

        <p className="text-center text-gray-400 mb-6">
          Student Grievance Portal
        </p>

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-yellow-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-yellow-500"
        />

        <button
          className="w-full bg-yellow-500 text-black font-semibold p-3 rounded hover:bg-yellow-400 transition"
        >
          Login
        </button>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;