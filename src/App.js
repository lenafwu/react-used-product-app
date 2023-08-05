import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Ads from "./Ads";
import Profile from "./Profile";
import Logout from "./Logout";
import UpdateProfile from "./UpdateProfile";
import Layout from "./Layout";
import RequireAuth from "./RequireAuth";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* TODO: public routes */}
        <Route path="/" element={<Ads />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* TODO: protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        {/* TODO: 404 page */}
      </Route>
    </Routes>
  );
}

export default App;
