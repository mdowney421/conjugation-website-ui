import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navBar";
import LandingPage from "./components/landingPage";
import VerbsPage from "./components/verbs";
import VerbDetailPage from "./components/verbDetail";
import PracticePage from "./components/practice/practice";
import AboutPage from "./components/aboutPage";
import Footer from "./components/footer";

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />

      <div className="page" key={location.pathname}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/verbs" element={<VerbsPage />} />
          <Route path="/verbs/:verb" element={<VerbDetailPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
