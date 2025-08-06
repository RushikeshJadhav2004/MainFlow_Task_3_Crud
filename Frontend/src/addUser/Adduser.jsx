import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast, ToastContainer } from "react-toastify"; // ✅ import toast
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";



const Adduser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:2000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({ name: "", email: "", age: "", password: "" });

      toast.success("🎉 User added successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });

      // ✅ Navigate after toast delay
      setTimeout(() => {
        navigate("/User");
      }, 3000);
    } else {
      toast.error("❌ Failed to add user.");
    }
  } catch (error) {
    toast.error("🚨 Something went wrong.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
      >
        {/* 🔙 Back Button */}
        <Link
          to="/User"
          className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow hover:from-indigo-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 mb-4"
        >
          <ArrowLeft size={12} className="mt-[1px]" />
          Back to Users
        </Link>

        <h2 className="text-3xl font-bold mb-6 text-center">✨ Add New User</h2>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition transform duration-300"
        >
          ➕ Add User
        </button>
      </form>

      {/* 🧁 Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Adduser;
