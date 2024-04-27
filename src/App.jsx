import { Route, Routes } from "react-router";
import styles from "./App.module.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import UserProfile from "./pages/UserProfile/UserProfile.jsx"
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <>
      <div className={styles.App}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/race" element />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/horses" element />
        </Routes>
      </div>
    </>
  );
}

export default App;
