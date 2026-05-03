import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/products';
import './ProductsSwipeStack.css';

/* ─── Swipe Stack Card ─── */
function SwipeCard({ product, onSwipeLeft, onSwipeRight, onView }) {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    const dx = e.touches[0].clientX - startPos.current.x;
    const dy = e.touches[0].clientY - startPos.current.y;
    setOffsetX(dx);
    setOffsetY(dy * 0.3); // restrict vertical movement
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    const threshold = 80;
    if (offsetX > threshold) {
      onSwipeRight(product);
    } else if (offsetX < -threshold) {
      onSwipeLeft(product);
    }
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleMouseDown = (e) => {
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setOffsetX(dx);
    setOffsetY(dy * 0.3);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 80;
    if (offsetX > threshold) {
      onSwipeRight(product);
    } else if (offsetX < -threshold) {
      onSwipeLeft(product);
    }
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setOffsetX(0);
      setOffsetY(0);
    }
  };

  const rotateZ = offsetX * 0.08;
  const opacity = Math.max(0, 1 - Math.abs(offsetX) / 400);
  const imgSrc = `${import.meta.env.BASE_URL}Product_pics/${product.image}`;

  return (
    <motion.div
      className="swipe-card"
      style={{
        x: offsetX,
        y: offsetY,
        rotate: rotateZ,
        opacity,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 100 : 1,
      }}
      drag={false}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
    >
      {/* Swipe indicators */}
      <div
        className="swipe-card__indicator swipe-card__indicator--left"
        style={{ opacity: Math.max(0, -offsetX / 80) }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Prev</span>
      </div>
      <div
        className="swipe-card__indicator swipe-card__indicator--right"
        style={{ opacity: Math.max(0, offsetX / 80) }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Next</span>
      </div>

      {/* Card content */}
      <div className="swipe-card__inner">
        <div className="swipe-card__image-wrap">
          <img src={imgSrc} alt={product.name} className="swipe-card__image" />
          <div className="swipe-card__category-tag">{product.subcategory}</div>
        </div>
        <div className="swipe-card__footer">
          <div className="swipe-card__info">
            <span className="swipe-card__name">{product.name}</span>
            <span className="swipe-card__desc">{product.description}</span>
          </div>
          <div className="swipe-card__meta">
            <span className="swipe-card__meta-item">
              <span className="swipe-card__meta-label">Colors</span>
              <span className="swipe-card__meta-value">{product.colours}</span>
            </span>
            <button
              className="swipe-card__view-btn"
              onClick={(e) => { e.stopPropagation(); onView(product); }}
            >
              View
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="swipe-card__swipe-hint">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h3M3 8l2.5-2.5M3 8l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 8h2M8 8l2.5-2.5M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 8h0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        Swipe to navigate
      </div>
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
export default function ProductsSwipeStack({ products }) {
  const [activeCategory, setActiveCategory] = useState('bottles-1l');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stackIndex, setStackIndex] = useState(0);
  const [stackProducts, setStackProducts] = useState([]);

  const filtered = products.filter((p) => {
    const matchCat = p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Sync stack with filtered
  const visibleProducts = filtered.slice(stackIndex, stackIndex + 3);
  const maxIndex = Math.max(0, filtered.length - 1);

  const handleSwipeLeft = useCallback(() => {
    setStackIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const handleSwipeRight = useCallback(() => {
    setStackIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setStackIndex(0);
    setSearch('');
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setStackIndex(0);
  };

  return (
    <div className="products-swipe">
      <div className="products-page-header">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="products-page-title">Our Products</h1>
            <p className="products-page-subtitle">
              100+ variations — Concept D: Swipe Stack. Drag or swipe cards to navigate.
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
                onChange={handleSearch} className="products-search__input" />
            </div>
            <div className="products-tabs">
              {categories.map((cat) => (
                <button key={cat.id}
                  className={`products-tab ${activeCategory === cat.id ? 'products-tab--active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.label}<span className="products-tab__count">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Stack Area */}
      <div className="swipe-section">
        <div className="container">
          <motion.div
            className="swipe-stack"
            key={activeCategory + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress indicator */}
            <div className="swipe-progress">
              <div className="swipe-progress__bar">
                <motion.div
                  className="swipe-progress__fill"
                  initial={false}
                  animate={{ width: `${((stackIndex + 1) / Math.max(filtered.length, 1)) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>
              <span className="swipe-progress__label">
                {filtered.length === 0 ? 'No results' : `${Math.min(stackIndex + 1, filtered.length)} of ${filtered.length}`}
              </span>
            </div>

            {/* Card stack */}
            <div className="swipe-stack__cards">
              <AnimatePresence mode="popLayout">
                {visibleProducts.length === 0 && (
                  <motion.div
                    className="swipe-empty"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  >
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p>No products found matching your search.</p>
                  </motion.div>
                )}
                {visibleProducts.map((product, i) => (
                  <SwipeCard
                    key={`${product.id}-${stackIndex + i}`}
                    product={product}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    onView={setSelectedProduct}
                  />
                )).reverse()}
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <div className="swipe-nav">
              <button
                className="swipe-nav__btn"
                onClick={handleSwipeRight}
                disabled={stackIndex === 0}
                aria-label="Previous product"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="swipe-dots">
                {filtered.slice(0, Math.min(filtered.length, 8)).map((_, i) => (
                  <button
                    key={i}
                    className={`swipe-dots__dot ${stackIndex === i ? 'swipe-dots__dot--active' : ''}`}
                    onClick={() => setStackIndex(i)}
                    aria-label={`Go to product ${i + 1}`}
                  />
                ))}
                {filtered.length > 8 && <span className="swipe-dots__more">+{filtered.length - 8}</span>}
              </div>

              <button
                className="swipe-nav__btn"
                onClick={handleSwipeLeft}
                disabled={stackIndex >= maxIndex}
                aria-label="Next product"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>
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