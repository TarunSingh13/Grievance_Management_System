import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
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
      const res = await axios.post("http://localhost:5000/api/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <form className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96 border border-yellow-600">

        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          Create Account
        </h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-3 p-3 bg-gray-800 text-white border border-gray-700 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-3 bg-gray-800 text-white border border-gray-700 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-gray-800 text-white border border-gray-700 rounded"
        />

        <button className="w-full bg-yellow-500 text-black p-3 rounded hover:bg-yellow-400">
          Register
        </button>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-yellow-400">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Register;