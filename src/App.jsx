import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import WorkPage from "./pages/Work";
import AboutPage from "./pages/About";
import ProjectDetail from "./pages/ProjectDetail";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/project/:id"
            element={
              <>
                <ProjectDetail />
                <Footer />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Header />
                <main className="content">
                  <Routes>
                    <Route path="/work" element={<WorkPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/" element={<Navigate to="/work" replace />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
