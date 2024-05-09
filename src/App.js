import { useState } from "react";
import "./App.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.css";
import "./../node_modules/bootstrap/dist/css/bootstrap-utilities.css";
import Navbar from "./components/navbar";
import HomePage from "./components/homepage";
import VerbsPage from "./components/verbs";
import PracticePage from "./components/practice";

const App = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <>
      <Navbar setActivePage={setActivePage} />

      {activePage === "home" ? (
        <HomePage setActivePage={setActivePage} />
      ) : null}

      {activePage === "verbs" ? <VerbsPage /> : null}

      {activePage === "practice" ? <PracticePage /> : null}
    </>
  );
};

export default App;
