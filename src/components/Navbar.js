import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/", { replace: true });
  };
  return (
    <nav className="nav">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        {!auth?.accessToken ? (
          <>
            <li>
              <a href="/register">Sign Up</a>
            </li>
            <li>
              <a href="/login">Sign In</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <Link onClick={signOut}>Log Out ({auth?.user})</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
