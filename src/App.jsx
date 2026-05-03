import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsMirrorFlip from './pages/ProductsMirrorFlip';
import CatalogsPage from './pages/CatalogsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { products } from './data/products';
import './styles/global.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsMirrorFlip products={products} />} />
              <Route path="/catalogs" element={<CatalogsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
