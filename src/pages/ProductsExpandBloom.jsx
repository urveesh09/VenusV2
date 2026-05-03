import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/products';
import './ProductsExpandBloom.css';

/* ─── Expand Bloom Card ─── */
function BloomCard({ product, onSelect }) {
  const [expanded, setExpanded] = useState(false);
  const imgSrc = `/Product_pics/${product.image}`;

  return (
    <div className="bloom-card-wrapper">
      <motion.div
        className={`bloom-card ${expanded ? 'bloom-card--expanded' : ''}`}
        layout
      >
        {/* Product image — always visible */}
        <div className="bloom-card__image-wrap" onClick={() => !expanded && setExpanded(true)}>
          <img src={imgSrc} alt={product.name} className="bloom-card__image" />
          {!expanded && (
            <div className="bloom-card__tap-hint">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M7 4.5v3l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Tap to expand
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bloom-card__footer">
          <div className="bloom-card__footer-left">
            <span className="bloom-card__name">{product.name}</span>
            <span className="bloom-card__subcategory">{product.subcategory}</span>
          </div>
          {!expanded && (
            <button
              className="bloom-card__expand-btn"
              onClick={() => setExpanded(true)}
              aria-label={`Expand ${product.name}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="bloom-card__details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="bloom-card__details-inner">
                <div className="bloom-card__detail-row">
                  <div className="bloom-card__detail-item">
                    <span className="bloom-card__detail-label">Description</span>
                    <span className="bloom-card__detail-value bloom-card__detail-value--desc">
                      {product.description}
                    </span>
                  </div>
                </div>
                <div className="bloom-card__detail-row bloom-card__detail-row--meta">
                  <div className="bloom-card__detail-item">
                    <span className="bloom-card__detail-label">Colors</span>
                    <span className="bloom-card__detail-value">{product.colours}</span>
                  </div>
                  <div className="bloom-card__detail-item">
                    <span className="bloom-card__detail-label">Category</span>
                    <span className="bloom-card__detail-value">{product.subcategory}</span>
                  </div>
                </div>
                <div className="bloom-card__detail-actions">
                  <button
                    className="bloom-card__view-btn"
                    onClick={() => onSelect(product)}
                  >
                    View Full Details
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className="bloom-card__close-btn"
                    onClick={() => setExpanded(false)}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Collapse
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ─── Product Modal ─── */
function ProductModal({ product, onClose }) {
  if (!product) return null;
  const imgSrc = `/Product_pics/${product.image}`;
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
export default function ProductsExpandBloom({ products }) {
  const [activeCategory, setActiveCategory] = useState('bottles-1l');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = products.filter((p) => {
    const matchCat = p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="products-bloom">
      <div className="products-page-header">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="products-page-title">Our Products</h1>
            <p className="products-page-subtitle">
              100+ variations — Concept C: Expand Bloom. Tap any card to expand it in place.
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
                <BloomCard key={product.id} product={product} onSelect={setSelectedProduct} />
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