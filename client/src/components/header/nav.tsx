import { NavLink } from "react-router";
import { authStore } from "../../store/auth";
import Cookies from "js-cookie";

export const NavBar = () => {
  const { token } = authStore();

  return (
    <nav className="flex justify-center items-center gap-4 ml-auto">
      <NavLink to="/">Home</NavLink>
      {token ? <ProtectedRoutes /> : <AuthRoutes />}
    </nav>
  );
};

const ProtectedRoutes = () => {
  const logout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/leads">Leads</NavLink>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

const AuthRoutes = () => {
  return (
    <>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </>
  );
};
