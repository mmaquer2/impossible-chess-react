export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__meta">
          <div className="footer__logo">Impossible Chess</div>
          <p>How long can you last against the world's hardest chess bot?</p>
        </div>
        <ul className="footer__list">
          <li className="footer__list__item">
            <a href="/" className="footer__list__a">
              Home
            </a>
          </li>
          <li className="footer__list__item">
            <a href="/about" className="footer__list__a">
              About
            </a>
          </li>
          <li className="footer__list__item">
            <a href="/changelog" className="footer__list__a">
              Changelog
            </a>
          </li>
          <li className="footer__list__item">
            <a
              href="mailto:hello@impossiblechess.com"
              className="footer__list__a"
            >
              Contact
            </a>
          </li>
        </ul>
        <span>
          Copyright &copy; {new Date().getFullYear()} Impossible Chess. All
          Rights Reserved. Created by{" "}
          <a href="https://owenbick.com">Owen Bick</a> and{" "}
          <a href="https://mikemaquera.dev/">Mike Maquera</a>.
        </span>
      </div>
    </footer>
  );
}
