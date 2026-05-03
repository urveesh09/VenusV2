import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/products';
import './ProductsMirrorFlip.css';

/* ─── Card variants for framer-motion ─── */
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

/* ─── Floating idle keyframes (CSS injected via style) ─── */
const floatingKeyframes = `
  @keyframes flipCardFloat {
    0%, 100% { transform: translateY(0px) rotateY(0deg); }
    50% { transform: translateY(-5px) rotateY(0deg); }
  }
  @keyframes shimmerWave {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

/* ─── MirrorFlip Card ─── */
function MirrorFlipCard({ product, onSelect }) {
  const [flipped, setFlipped] = useState(false);
  const imgSrc = `${import.meta.env.BASE_URL}Product_pics/${product.image}`;

  const handleFlip = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <motion.div
      className="flip-card"
      variants={cardVariants}
      layout
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${product.name} — tap to ${flipped ? 'flip back' : 'see details'}`}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* 3D Flip Container */}
      <motion.div
        className={`flip-card__inner ${flipped ? 'flip-card__inner--flipped' : ''}`}
        animate={flipped ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.8 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ═══ FRONT FACE ═══ */}
        <div className="flip-card__face flip-card__face--front">
          {/* Ambient glow on hover */}
          <div className="flip-card__ambient-glow" />

          {/* Product image */}
          <div className="flip-card__image-wrap">
            <motion.img
              src={imgSrc}
              alt={product.name}
              className="flip-card__image"
              animate={flipped ? { scale: 1.06 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Overlay gradient */}
            <div className="flip-card__image-overlay" />
          </div>

          {/* Front footer */}
          <div className="flip-card__front-footer">
            <div className="flip-card__name-group">
              <span className="flip-card__name">{product.name}</span>
              <span className="flip-card__subcategory">{product.subcategory}</span>
            </div>
            <motion.div
              className="flip-card__tap-hint"
              animate={flipped ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1.5C7 1.5 4 5 4 7.5c0 1.66 1.34 3 3 3s3-1.34 3-3C10 5 7 1.5 7 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M7 10.5v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </motion.div>
              <span>Tap to flip</span>
            </motion.div>
          </div>

          {/* Decorative corner accent */}
          <div className="flip-card__corner-accent">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 18L18 2M2 12L2 18L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ═══ BACK FACE ═══ */}
        <div className="flip-card__face flip-card__face--back">
          {/* Shimmer stripe across back */}
          <div className="flip-card__back-shimmer" />

          <div className="flip-card__back-content">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.12, duration: 0.35 }}
            >
              <span className="flip-card__subcategory">{product.subcategory}</span>
            </motion.div>

            <motion.h3
              className="flip-card__back-name"
              initial={{ opacity: 0, y: 8 }}
              animate={flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              {product.name}
            </motion.h3>

            <motion.p
              className="flip-card__back-desc"
              initial={{ opacity: 0, y: 8 }}
              animate={flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.18, duration: 0.35 }}
            >
              {product.description}
            </motion.p>

            <motion.div
              className="flip-card__back-meta"
              initial={{ opacity: 0, y: 8 }}
              animate={flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.21, duration: 0.35 }}
            >
              <div className="flip-card__meta-item">
                <span className="flip-card__meta-label">Colors</span>
                <span className="flip-card__meta-value">{product.colours}</span>
              </div>
              <div className="flip-card__meta-item">
                <span className="flip-card__meta-label">Type</span>
                <span className="flip-card__meta-value">{product.subcategory}</span>
              </div>
            </motion.div>

            <motion.button
              className="flip-card__view-btn"
              initial={{ opacity: 0, y: 8 }}
              animate={flipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.24, duration: 0.35 }}
              onClick={(e) => { e.stopPropagation(); onSelect(product); }}
              whileHover={{ scale: 1.04, x: 3 }}
              whileTap={{ scale: 0.97 }}
            >
              View Details
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>

          {/* Flip back hint */}
          <motion.div
            className="flip-card__flip-back-hint"
            animate={flipped ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, -15, 0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L2 5l4 4M2 7l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span>Tap to flip back</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Product Modal ─── */
function ProductModal({ product, onClose }) {
  if (!product) return null;
  const imgSrc = `${import.meta.env.BASE_URL}Product_pics/${product.image}`;

  return (
    <motion.div
      className="product-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="product-modal__panel"
        initial={{ scale: 0.82, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="product-modal__close" onClick={onClose} aria-label="Close">
          <motion.svg
            width="20" height="20" viewBox="0 0 20 20" fill="none"
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.25 }}
          >
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </motion.svg>
        </button>

        <div className="product-modal__image-wrap">
          <motion.img
            src={imgSrc}
            alt={product.name}
            className="product-modal__image"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          />
          <div className="product-modal__image-overlay" />
        </div>

        <motion.div
          className="product-modal__info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          <motion.span
            className="product-modal__subcategory"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.35 }}
          >
            {product.subcategory}
          </motion.span>

          <motion.h2
            className="product-modal__name"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            {product.name}
          </motion.h2>

          <motion.p
            className="product-modal__desc"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.35 }}
          >
            {product.description}
          </motion.p>

          <motion.div
            className="product-modal__meta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.31, duration: 0.35 }}
          >
            <span className="product-modal__meta-item">
              <span className="product-modal__meta-label">Colors Available</span>
              <span className="product-modal__meta-value">{product.colours}</span>
            </span>
            <span className="product-modal__meta-item">
              <span className="product-modal__meta-label">Category</span>
              <span className="product-modal__meta-value">{product.subcategory}</span>
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function ProductsMirrorFlip({ products }) {
  const [activeCategory, setActiveCategory] = useState('bottles-1l');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = products.filter((p) => {
    const matchCat = p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="products-flip">
      {/* Inject keyframes */}
      <style>{floatingKeyframes}</style>

      {/* Page Header */}
      <motion.div
        className="products-page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container">
          <motion.span
            className="products-page-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="products-page-eyebrow__dot" />
            100+ Product Variations
          </motion.span>
          <motion.h1
            className="products-page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Our Products
          </motion.h1>
          <motion.p
            className="products-page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Tap any card to flip it and reveal product details — a visual experience designed to delight.
          </motion.p>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="products-controls"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="container">
          <div className="products-controls__inner">
            <motion.div
              className="products-search"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="products-search__icon">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="products-search__input"
              />
            </motion.div>

            <motion.div
              className="products-tabs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  className={`products-tab ${activeCategory === cat.id ? 'products-tab--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.04, duration: 0.35 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.label}
                  <span className="products-tab__count">{cat.count}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="products-grid-wrap">
        <div className="container">
          <motion.div
            className="products-grid"
            variants={cardContainerVariants}
            initial="hidden"
            animate="visible"
            key={activeCategory + search}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <MirrorFlipCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              className="products-empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <motion.svg
                width="48" height="48" viewBox="0 0 48 48" fill="none"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </motion.svg>
              <p>No products found matching your search.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
