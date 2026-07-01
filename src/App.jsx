import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Showcase from "./pages/Showcase";
import ProductPage from "./pages/ProductPage";
import ScrollToTop from "./ScrollToTop";
import "./styles/global.css";

function App() {
  return (
    
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/showcase"
              element={<Showcase />}
            />

            <Route
              path="/product/:id"
              element={<ProductPage />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;