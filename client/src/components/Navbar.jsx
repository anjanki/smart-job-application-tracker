import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <h1 className="text-xl font-bold text-emerald-600">Smart Job Tracker</h1>

        {token && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user?.name}</span>
            <Link to="/dashboard" className="text-sm font-medium text-slate-700">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-500 px-4 py-2 text-sm text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
