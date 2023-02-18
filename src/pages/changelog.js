import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

function Changelog() {
  return (
    <>
      <Helmet>
        <title>Changelog | Impossible Chess</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Header />
      <section className="hero">
        <div className="container">
          <h1>Changelog</h1>
        </div>
      </section>
      <section className="changelog">
        <div className="container">
          <div className="changelog__item">
            <h1>v1.0</h1>
            <time>Feb 14, 2023</time>
            <p>🎉 We have launched ImpossibleChess.com</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export { Changelog };
