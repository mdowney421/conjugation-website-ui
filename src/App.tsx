import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import VerbsPage from "./pages/VerbsPage";
import VerbDetailPage from "./pages/VerbDetailPage";
import PracticePage from "./pages/PracticePage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />

      <div className="page" key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
