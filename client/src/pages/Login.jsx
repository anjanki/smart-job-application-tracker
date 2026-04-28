import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">Login</h2>

        {error && (
          <p className="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-emerald-600 px-4 py-2 text-white"
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-emerald-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
