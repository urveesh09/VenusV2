import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HomePage.css';

const heroWords = ['Precision', 'Crafted', 'Plastic'];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero__bg" style={{ y: heroY }}>
          <div className="hero__bg-layer hero__bg-layer--1" />
          <div className="hero__bg-layer hero__bg-layer--2" />
          <div className="hero__bg-layer hero__bg-layer--3" />
        </motion.div>

        <motion.div
          className="hero__content"
          style={{ opacity: heroOpacity }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__eyebrow" variants={itemVariants}>
            <span className="hero__eyebrow-dot" />
            25 Years in Indian Manufacturing
          </motion.div>

          <motion.h1 className="hero__title" variants={itemVariants}>
            <span className="hero__title-line">Premium</span>
            <span className="hero__title-line hero__title-line--accent">Plastic</span>
            <span className="hero__title-line">Solutions</span>
          </motion.h1>

          <motion.p className="hero__desc" variants={itemVariants}>
            Bottles, jars, and caps — 100+ variations crafted in Vasai.
            Trusted by businesses across India for 25 years.
          </motion.p>

          <motion.div className="hero__actions" variants={itemVariants}>
            <Link to="/products" className="btn btn--primary">
              <span>Explore Products</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/products" className="btn btn--ghost">
              View All Products
            </Link>
          </motion.div>

          <motion.div className="hero__stats" variants={itemVariants}>
            <div className="hero__stat">
              <span className="hero__stat-number">100+</span>
              <span className="hero__stat-label">Product Types</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">25</span>
              <span className="hero__stat-label">Years Legacy</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">Vasai</span>
              <span className="hero__stat-label">Mumbai, India</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__scroll-hint"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="hero__scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* ── BRAND STATEMENT ── */}
      <section className="brand-statement">
        <div className="container">
          <motion.div
            className="brand-statement__inner"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="brand-statement__text">
              "At Venus Plastic, every bottle tells a story of{' '}
              <strong>precision, durability, and design</strong> —
              crafted for those who value quality over compromise."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="featured-products">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">Our Collection</span>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-desc">
              Tap any card to flip it and reveal product details — a visual experience designed to delight.
            </p>
          </motion.div>

          <motion.div
            className="featured-showcase"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="featured-showcase__product-grid">
              <Link to="/products" className="featured-showcase__card">
                <div className="featured-showcase__card-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M8 12h24v20a4 4 0 01-4 4H12a4 4 0 01-4-4V12z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 12V8a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M16 20h8M16 26h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="featured-showcase__card-label">Bottles</div>
                <div className="featured-showcase__card-count">41+ varieties</div>
              </Link>
              <Link to="/products" className="featured-showcase__card">
                <div className="featured-showcase__card-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="6" y="10" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 10V6a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M13 20h14M13 26h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="featured-showcase__card-label">Jars & Dispensers</div>
                <div className="featured-showcase__card-count">9 varieties</div>
              </Link>
              <Link to="/products" className="featured-showcase__card">
                <div className="featured-showcase__card-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="featured-showcase__card-label">Steel Bottles</div>
                <div className="featured-showcase__card-count">Premium finish</div>
              </Link>
              <Link to="/products" className="featured-showcase__card">
                <div className="featured-showcase__card-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M10 30V18l10-8 10 8v12H10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M16 30v-8h8v8" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="featured-showcase__card-label">Cap Variations</div>
                <div className="featured-showcase__card-count">3 types</div>
              </Link>
            </div>
            <div className="featured-showcase__cta">
              <Link to="/products" className="btn btn--primary">
                View All Products
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="highlights">
        <div className="container">
          <div className="highlights__grid">
            {[
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M16 6v10l6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                title: '25 Years Strong',
                desc: 'Active in Indian plastic industry since 1999. A legacy of consistent quality and reliable delivery.',
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M4 20 L10 12 L16 16 L22 8 L28 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="28" cy="14" r="3" fill="currentColor"/>
                  </svg>
                ),
                title: '100+ Variations.',
                desc: 'From 500ml to 1.2L — bottles, jars, and caps. Multiple colors, finishes, and cap styles available.',
              },
              {
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4 L20 12 L28 14 L22 20 L24 28 L16 24 L8 28 L10 20 L4 14 L12 12 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Pan-India Supply',
                desc: 'Products delivered across multiple states. Trusted by retailers and distributors nationwide.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="highlight-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="highlight-card__icon">{item.icon}</div>
                <h3 className="highlight-card__title">{item.title}</h3>
                <p className="highlight-card__desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOGS STRIP ── */}
      <section className="catalogs-strip">
        <div className="container">
          <motion.div
            className="catalogs-strip__inner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="catalogs-strip__text">
              <h2 className="catalogs-strip__title">100+ Variations.</h2>
              <p className="catalogs-strip__desc">
                Browse every bottle, jar, and cap in our full collection — filter by size, category, and colour.
              </p>
            </div>
            <Link to="/catalogs" className="btn btn--accent">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2v10M5 8l4 4 4-4M3 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              View &amp; Download Catalogs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="about-preview">
        <div className="container">
          <div className="about-preview__inner">
            <motion.div
              className="about-preview__content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-eyebrow">Who We Are</span>
              <h2 className="section-title">Made in Vasai.<br />Trusted Across India.</h2>
              <p className="about-preview__text">
                Venus Plastic is active in Indian Plastic Industries since last 25 years.
                Our unit is located at Vasai near Mumbai City. We produce all kinds of
                water bottles, jars and caps that are sent throughout the nation.
              </p>
              <Link to="/about" className="btn btn--text">
                Our Story
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
            <motion.div
              className="about-preview__visual"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="about-preview__badge">
                <span className="about-preview__badge-year">25</span>
                <span className="about-preview__badge-label">Years of Excellence</span>
              </div>
              <div className="about-preview__shapes">
                <div className="about-preview__shape about-preview__shape--1" />
                <div className="about-preview__shape about-preview__shape--2" />
                <div className="about-preview__shape about-preview__shape--3" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="contact-cta">
        <div className="container">
          <motion.div
            className="contact-cta__inner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="contact-cta__title">Ready to Source?</h2>
            <p className="contact-cta__desc">
              Get in touch for bulk orders, custom requirements, or any product inquiry.
            </p>
            <div className="contact-cta__contacts">
              <a href="tel:+918850503661" className="contact-cta__contact">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 3h4l1.5 3.5-2 1.5c.5 1 .5 2.5 1.5 3.5l1.5-1c1-.5 2.5-.5 3.5 1 1.5 2 1 5-2 7.5S6 16.5 3.5 15C1 12.5.5 9 .5 6.5S1.5 2.5 3 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                </svg>
                +91 8850503661
              </a>
              <a href="mailto:venusvasai@gmail.com" className="contact-cta__contact">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                venusvasai@gmail.com
              </a>
            </div>
            <Link to="/contact" className="btn btn--primary">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}