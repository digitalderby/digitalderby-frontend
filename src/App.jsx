import { Route, Routes } from "react-router";
import styles from "./App.module.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <div className={styles.App}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/race" element />
          <Route path="/user" element />
          <Route path="/login" element />
          <Route path="/horses" element />
        </Routes>
      </div>
    </>
  );
}

export default App;
