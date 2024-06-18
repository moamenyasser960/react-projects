import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Resume from "./components/Resume";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-gray-100">
        <div>
          <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-3xl font-bold">My Portfolio</h1>
              <nav>
                <Link to="/" className="px-4">
                  Home
                </Link>
                <Link to="/projects" className="px-4">
                  Projects
                </Link>
                <Link to="/skills" className="px-4">
                  Skills
                </Link>
                <Link to="/resume" className="px-4">
                  Resume
                </Link>
              </nav>
            </div>
          </header>
          <main className="container mx-auto p-4 pt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </main>
        </div>
        <footer className="bg-gray-800 text-white p-4 mt-8 text-center">
          <p>&copy; 2024 My Portfolio. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
