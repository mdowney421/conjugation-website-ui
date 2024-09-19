import { useState } from "react";
import "./App.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.css";
import "./../node_modules/bootstrap/dist/css/bootstrap-utilities.css";
import Navbar from "./components/navBar";
import LandingPage from "./components/landingPage";
import VerbsPage from "./components/verbs";
import PracticePage from "./components/practice/practice";

const App = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <>
      <Navbar setActivePage={setActivePage} />

      {activePage === "home" ? (
        <LandingPage setActivePage={setActivePage} />
      ) : null}

      {activePage === "verbs" ? <VerbsPage /> : null}

      {activePage === "practice" ? <PracticePage /> : null}
    </>
  );
};

export default App;
