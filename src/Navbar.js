import useAuth from "./hooks/useAuth";

const Navbar = () => {
  const { auth } = useAuth();
  return (
    <nav className="nav">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        {!auth?.user ? (
          <>
            <li>
              <a href="/register">Sign Up</a>
            </li>
            <li>
              <a href="/login">Sign In</a>
            </li>
          </>
        ) : (
          <li>
            <a href="/logout">Log Out ({auth?.user})</a>
          </li>
        )}

        <li>
          <a href="/profile">Profile</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
