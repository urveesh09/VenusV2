import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand-name">Venus Plastic</div>
          <p className="footer__brand-desc">
            25 years of precision manufacturing in Indian plastic industry.
            Premium bottles, jars, and caps — delivered across India.
          </p>
        </div>

        <div>
          <div className="footer__col-title">Navigate</div>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/catalogs">Catalogs</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer__col-title">Products</div>
          <ul className="footer__links">
            <li><Link to="/products">1 Litre Bottles</Link></li>
            <li><Link to="/products">500ml Bottles</Link></li>
            <li><Link to="/products">Jars & Dispensers</Link></li>
            <li><Link to="/products">Cap Variations</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer__col-title">Contact</div>
          <ul className="footer__links">
            <li>+91 8850503661</li>
            <li>+91 9022548615</li>
            <li>venusvasai@gmail.com</li>
            <li style={{ marginTop: '0.5rem', fontSize: '0.8rem', lineHeight: 1.5 }}>
              103, Manish Industrial Estate No. 3,<br />
              Navghar Vasai (East),<br />
              Dist. Palghar - 401 202,<br />
              Mumbai, Maharashtra
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} Venus Plastic. All rights reserved.
      </div>
    </footer>
  );
}
