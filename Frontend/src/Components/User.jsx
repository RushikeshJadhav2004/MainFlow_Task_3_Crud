import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [data, setData] = useState([]);

  // Fetch users
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/user");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/user/${id}`);
      setData((prev) => prev.filter((user) => user._id !== id)); // ✅ Fix
      toast.success("🗑️ User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("❌ Failed to delete user.");
    }
  };

  return (
    <>
      {/* ✅ Toast container outside for better visibility */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen flex items-center justify-center px-4 py-10 tdiv">
        <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/10">
          <h2 className="text-3xl text-white font-bold mb-6 text-center">
            🧑‍💻 User Kundaiii
          </h2>

          <div className="flex items-center space-x-4 my-3">
            <Link
              to="/Adduser"
              style={{ textDecoration: "none" }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
            >
              <Plus size={18} />
              Register
            </Link>

            <input
              type="text"
              placeholder="Filter users..."
              className="px-4 ms-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-white rounded-xl overflow-hidden transition-all duration-300">
              <thead className="bg-white/10 border-b border-white/20">
                <tr>
                  <th className="px-6 py-4">Sr. No</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Age</th>
                  <th className="px-6 py-4">Password</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {data.map((user, index) => (
                  <tr
                    className="transition-transform duration-300 hover:bg-white/5"
                    key={user._id} // ✅ unique key
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.age}</td>
                    <td className="px-6 py-4">{user.password}</td>
                    <td className="px-6 py-4 space-x-2">
                      <Link
                        to={`/updateuser/${user._id}`}
                        style={{ textDecoration: "none" }}
                        className="px-4 py-1 rounded  bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg transition duration-300 hover:scale-105"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="rounded px-4 ms-2 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white shadow-lg transition duration-300 hover:scale-105"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
