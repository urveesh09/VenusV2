import { motion } from 'framer-motion';
import { catalogs } from '../data/products';
import './CatalogsPage.css';

// Map cover IDs to gradient class
const coverGradient = {
  products: 'catalog-card__cover--products',
  'new-products': 'catalog-card__cover--new',
  steel: 'catalog-card__cover--steel',
};

export default function CatalogsPage() {
  return (
    <div className="catalogs-page">
      <div className="catalogs-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-eyebrow">Resources</span>
            <h1 className="catalogs-title">Product Catalogs</h1>
            <p className="catalogs-subtitle">
              Download our complete range catalogs. Available for instant access.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="catalogs-grid">
          {catalogs.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="catalog-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="catalog-card__visual">
                <div className={`catalog-card__cover ${coverGradient[cat.cover] || ''}`}>
                  <div className="catalog-card__badge">{cat.badge}</div>
                  <div className="catalog-card__page-count">{cat.pageCount} pages</div>
                  <div className="catalog-card__icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <rect x="8" y="4" width="28" height="38" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M13 14h18M13 22h18M13 30h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <rect x="24" y="24" width="16" height="20" rx="1.5" fill="rgba(212,175,55,0.2)" stroke="#d4af37" strokeWidth="1.5"/>
                      <path d="M29 31h7M29 36h5" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="catalog-card__label">{cat.title}</span>
                </div>
              </div>

              <div className="catalog-card__info">
                <h2 className="catalog-card__name">{cat.title}</h2>
                <p className="catalog-card__desc">{cat.description}</p>
                <a
                  href={cat.file}
                  className="catalog-card__btn"
                  download
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download PDF
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="catalogs-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          PDFs are available for download. Contact us if you need them sent via email.
        </motion.div>
      </div>
    </div>
  );
}