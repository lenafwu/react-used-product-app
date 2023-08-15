import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Ads from "./components/Ads";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import Missing from "./components/Missing";
import Layout from "./components/Layout";
import Ad from "./components/Ad";
import AddEditAd from "./components/AddEditAd";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* TODO: public routes */}

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* TODO: wrap protected routes with PersistLogin component */}
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Ads />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/create-ad" element={<AddEditAd />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
