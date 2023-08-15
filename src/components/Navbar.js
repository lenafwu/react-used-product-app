import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
        <li>
          <Link to="/create-ad">Post Ad</Link>
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
        <li>
          {location.pathname !== "/" && (
            <Link
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
