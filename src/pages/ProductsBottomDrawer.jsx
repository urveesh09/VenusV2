import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/products';
import './ProductsBottomDrawer.css';

/* ─── Bottom Drawer Card ─── */
function DrawerCard({ product, onSelect }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const imgSrc = `/VenusV2/Product_pics/${product.image}`;

  const handleOpen = () => setDrawerOpen(true);
  const handleClose = () => setDrawerOpen(false);
  const handleViewDetails = (e) => {
    e.stopPropagation();
    onSelect(product);
  };

  return (
    <motion.div
      className="drawer-card"
      layout
    >
      <div className="drawer-card__image-wrap" onClick={handleOpen}>
        <img src={imgSrc} alt={product.name} className="drawer-card__image" />
        <div className="drawer-card__overlay">
          <div className="drawer-card__tap-zone">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Tap for details
          </div>
        </div>
      </div>

      <div className="drawer-card__footer">
        <span className="drawer-card__name">{product.name}</span>
        <span className="drawer-card__subcategory">{product.subcategory}</span>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="drawer-card__drawer"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-card__drawer-handle" onClick={handleClose}>
              <div className="drawer-card__handle-bar" />
              <button className="drawer-card__close" onClick={handleClose} aria-label="Close drawer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="drawer-card__drawer-content">
              <div className="drawer-card__drawer-left">
                <div className="drawer-card__drawer-image-wrap">
                  <img src={imgSrc} alt={product.name} className="drawer-card__drawer-image" />
                </div>
              </div>

              <div className="drawer-card__drawer-right">
                <span className="drawer-card__drawer-subcategory">{product.subcategory}</span>
                <h3 className="drawer-card__drawer-name">{product.name}</h3>
                <p className="drawer-card__drawer-desc">{product.description}</p>
                <div className="drawer-card__drawer-meta">
                  <span className="drawer-card__meta-item">
                    <span className="drawer-card__meta-label">Colors Available</span>
                    <span className="drawer-card__meta-value">{product.colours}</span>
                  </span>
                  <span className="drawer-card__meta-item">
                    <span className="drawer-card__meta-label">Category</span>
                    <span className="drawer-card__meta-value">{product.subcategory}</span>
                  </span>
                </div>
                <button className="drawer-card__view-btn" onClick={handleViewDetails}>
                  View Full Details
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay backdrop when drawer open */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="drawer-card__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Product Modal ─── */
function ProductModal({ product, onClose }) {
  if (!product) return null;
  const imgSrc = `/VenusV2/Product_pics/${product.image}`;
  return (
    <motion.div
      className="product-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="product-modal__panel"
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="product-modal__close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="product-modal__image-wrap">
          <img src={imgSrc} alt={product.name} className="product-modal__image" />
        </div>
        <div className="product-modal__info">
          <span className="product-modal__subcategory">{product.subcategory}</span>
          <h2 className="product-modal__name">{product.name}</h2>
          <p className="product-modal__desc">{product.description}</p>
          <div className="product-modal__meta">
            <span className="product-modal__meta-item">
              <span className="product-modal__meta-label">Colors Available</span>
              <span className="product-modal__meta-value">{product.colours}</span>
            </span>
            <span className="product-modal__meta-item">
              <span className="product-modal__meta-label">Category</span>
              <span className="product-modal__meta-value">{product.subcategory}</span>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function ProductsBottomDrawer({ products }) {
  const [activeCategory, setActiveCategory] = useState('bottles-1l');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = products.filter((p) => {
    const matchCat = p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="products-drawer">
      <div className="products-page-header">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="products-page-title">Our Products</h1>
            <p className="products-page-subtitle">
              100+ variations — Concept B: Bottom Drawer. Tap any card to open its details drawer.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="products-controls">
        <div className="container">
          <div className="products-controls__inner">
            <div className="products-search">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="products-search__icon">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <input type="text" placeholder="Search products..." value={search}
                onChange={(e) => setSearch(e.target.value)} className="products-search__input" />
            </div>
            <div className="products-tabs">
              {categories.map((cat) => (
                <button key={cat.id}
                  className={`products-tab ${activeCategory === cat.id ? 'products-tab--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}<span className="products-tab__count">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="products-grid-wrap">
        <div className="container">
          <motion.div className="products-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <DrawerCard key={product.id} product={product} onSelect={setSelectedProduct} />
              ))}
            </AnimatePresence>
          </motion.div>
          {filtered.length === 0 && (
            <div className="products-empty">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p>No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}