import { motion } from 'framer-motion';
import './ContactPage.css';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-eyebrow">Get In Touch</span>
            <h1 className="contact-hero__title">Contact Us</h1>
            <p className="contact-hero__subtitle">
              For bulk orders, custom requirements, or any product inquiry.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout">
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="contact-info__card">
              <h2 className="contact-info__title">Venus Plastic</h2>
              <p className="contact-info__subtitle">25 Years in Indian Plastic Industry</p>

              <div className="contact-info__items">
                <a href="tel:+918850503661" className="contact-info__item">
                  <div className="contact-info__icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 3h4l2 4-2 1.5c.5 1 .5 2.5 1.5 3.5l1.5-1c1-.5 2.5-.5 3.5 1 1.5 2 1 5-2 7.5S7.5 18 5 16.5C2 13.5 1.5 9 1.5 6.5S2.5 3 3 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-info__item-label">Phone</div>
                    <div className="contact-info__item-value">+91 8850503661</div>
                  </div>
                </a>

                <a href="tel:+919022548615" className="contact-info__item">
                  <div className="contact-info__icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 3h4l2 4-2 1.5c.5 1 .5 2.5 1.5 3.5l1.5-1c1-.5 2.5-.5 3.5 1 1.5 2 1 5-2 7.5S7.5 18 5 16.5C2 13.5 1.5 9 1.5 6.5S2.5 3 3 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-info__item-label">Alternate</div>
                    <div className="contact-info__item-value">+91 9022548615</div>
                  </div>
                </a>

                <a href="mailto:venusvasai@gmail.com" className="contact-info__item">
                  <div className="contact-info__icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                      <path d="M2 7l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-info__item-label">Email</div>
                    <div className="contact-info__item-value">venusvasai@gmail.com</div>
                  </div>
                </a>

                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2C7 2 4.5 4 4.5 7c0 4 5.5 11 5.5 11s5.5-7 5.5-11C15.5 4 13 2 10 2z" stroke="currentColor" strokeWidth="1.4"/>
                      <circle cx="10" cy="7" r="2" stroke="currentColor" strokeWidth="1.4"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-info__item-label">Factory</div>
                    <div className="contact-info__item-value contact-info__item-value--address">
                      103, Manish Industrial Estate No. 3,<br />
                      Navghar Vasai (East),<br />
                      Dist. Palghar - 401 202,<br />
                      Mumbai, Maharashtra
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="contact-map"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact-map__frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7527.398359739807!2d72.8304291!3d19.3821739!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf2fb73ccf31277da!2sVenus%20Plastics!5e0!3m2!1sen!2sin!4v1659113083896!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venus Plastic Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}