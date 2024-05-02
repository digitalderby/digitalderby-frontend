import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import UserProfile from "./pages/UserProfile/UserProfile.jsx"
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import HorseListPage from "./pages/HorseListPage/HorseListPage.jsx";
import HorseDetailPage from "./pages/HorseDetailPage/HorseDetailPage.jsx";
import RacePage from "./pages/RacePage/RacePage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";

function App() {
  return (
    <>
      <div className={styles.App}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/race" element={<RacePage />}/>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/horses" element={<HorseListPage />} />
          <Route path="/horses/:id" element={<HorseDetailPage />} />
          <Route path="/admin" element={<DashboardPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
