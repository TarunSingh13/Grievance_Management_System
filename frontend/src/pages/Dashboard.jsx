import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api";

function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: ""
  });

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/api/grievances`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setGrievances(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${BASE_URL}/api/grievances`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/grievances/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  const handleUpdate = async (id) => {
    await axios.put(
      `${BASE_URL}/api/grievances/${id}`,
      { status: "Resolved" },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    fetchData();
  };

  const handleSearch = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/grievances/search/query?title=${search}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setGrievances(res.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-yellow-400 text-2xl mb-4">Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <select name="category" onChange={handleChange}>
          <option value="">Category</option>
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select>
        <button>Add</button>
      </form>

      <input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {grievances.map(g => (
        <div key={g._id}>
          <h3>{g.title}</h3>
          <button onClick={() => handleUpdate(g._id)}>Resolve</button>
          <button onClick={() => handleDelete(g._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;