import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  // Fetch data
  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/grievances", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setGrievances(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/grievances", form, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setForm({ title: "", description: "", category: "" });
    fetchData();
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/grievances/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  // Update
  const handleUpdate = async (id) => {
    await axios.put(
      `http://localhost:5000/api/grievances/${id}`,
      { status: "Resolved" },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    fetchData();
  };

  // Search
  const handleSearch = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/grievances/search/query?title=${search}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setGrievances(res.data);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-3">
        <h1 className="text-2xl font-bold text-yellow-400">
          Grievance Portal
        </h1>

        <button
          onClick={handleLogout}
          className="border border-yellow-500 text-yellow-400 px-4 py-1 rounded hover:bg-yellow-500 hover:text-black transition"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 p-5 rounded-xl border border-yellow-600 text-center">
          <h2 className="text-3xl text-yellow-400">{grievances.length}</h2>
          <p className="text-gray-400">Total</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl border border-yellow-600 text-center">
          <h2 className="text-3xl text-yellow-400">
            {grievances.filter(g => g.status === "Pending").length}
          </h2>
          <p className="text-gray-400">Pending</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl border border-yellow-600 text-center">
          <h2 className="text-3xl text-yellow-400">
            {grievances.filter(g => g.status === "Resolved").length}
          </h2>
          <p className="text-gray-400">Resolved</p>
        </div>
      </div>

      {/* Add Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-4 rounded-xl border border-gray-800 mb-6 flex flex-wrap gap-3"
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="p-2 bg-gray-800 border border-gray-700 rounded text-white"
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-2 bg-gray-800 border border-gray-700 rounded text-white"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="p-2 bg-gray-800 border border-gray-700 rounded text-white"
        >
          <option value="">Category</option>
          <option value="Academic">Academic</option>
          <option value="Hostel">Hostel</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>

        <button className="bg-yellow-500 text-black px-4 rounded">
          Add
        </button>
      </form>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-700 rounded text-white"
        />
        <button onClick={handleSearch} className="bg-green-500 px-4 rounded">
          Search
        </button>
        <button onClick={fetchData} className="bg-gray-500 px-4 rounded">
          Reset
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {grievances.map((g) => (
          <div key={g._id} className="bg-gray-900 p-4 rounded-xl border border-gray-800 hover:border-yellow-500 transition">
            <h3 className="text-lg font-bold text-yellow-400">{g.title}</h3>
            <p className="text-gray-400">{g.description}</p>

            <div className="flex justify-between mt-2 text-sm">
              <span>{g.category}</span>
              <span className={g.status === "Resolved" ? "text-green-400" : "text-yellow-400"}>
                {g.status}
              </span>
            </div>

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleUpdate(g._id)}
                className="bg-blue-500 px-3 py-1 rounded"
              >
                Resolve
              </button>

              <button
                onClick={() => handleDelete(g._id)}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;