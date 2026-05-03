import { motion } from 'framer-motion';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-eyebrow">Our Story</span>
            <h1 className="about-hero__title">About Venus Plastic</h1>
            <p className="about-hero__subtitle">
              25 years of precision manufacturing in Indian plastic industry.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="about-story">
        <div className="container">
          <div className="about-story__inner">
            <motion.div
              className="about-story__content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-eyebrow">Who We Are</span>
              <h2 className="section-title">Made in Vasai.<br />Trusted Across India.</h2>
              <p>
                Venus Plastic is active in Indian Plastic Industries since last 25 years.
                Our unit is located at Vasai near Mumbai City, India.
              </p>
              <p style={{ marginTop: '1rem' }}>
                We produce all kinds of water bottles, jars and caps that are sent throughout the nation,
                across many states. Our products range mostly between 500ml and 1.2L and there are more
                than Hundred types and variations.
              </p>
              <p style={{ marginTop: '1rem' }}>
                We make use of high quality preforms to produce the best bottles and jars you can get in
                the entire market. At Venus you are assured of quality products that are provided with
                highest standard of Technical Support.
              </p>
            </motion.div>

            <motion.div
              className="about-story__visual"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="about-story__badge">
                <span className="about-story__badge-num">25</span>
                <span className="about-story__badge-label">Years of<br />Excellence</span>
              </div>
              <div className="about-story__shapes">
                <div className="about-story__shape about-story__shape--1" />
                <div className="about-story__shape about-story__shape--2" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <div className="about-mission__grid">
            {[
              {
                title: 'Mission',
                text: 'To be our customer\'s first choice when selecting a world-class manufacturer of plastic fridge bottles and Jars. Create and develop advanced technologies and provide outstanding products and services that fulfill the needs of customers worldwide.',
              },
              {
                title: 'Vision',
                text: 'To embrace a top standard for satisfying the needs and expectations of our customers by supplying on-time, high quality products and services, with competitive pricing and long term consistent value.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="about-mission__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="about-mission__title">{item.title}</h3>
                <p className="about-mission__text">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-range">
        <div className="container">
          <motion.div
            className="about-range__header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">Our Products</span>
            <h2 className="section-title">Premium Collection</h2>
            <p className="section-desc">
              Beautifully designed Bottles and Jars with self-design, screen printed and foil printed
              designs available in multiple colours along with Steel and Plastic Caps.
            </p>
          </motion.div>

          <div className="about-range__stats">
            {[
              { num: '100+', label: 'Product Types' },
              { num: '500ml–1.2L', label: 'Size Range' },
              { num: '6+', label: 'Color Options' },
              { num: '25', label: 'Years Legacy' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="about-range__stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="about-range__stat-num">{s.num}</span>
                <span className="about-range__stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}