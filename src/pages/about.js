import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

function About() {
  return (
    <>
      <Helmet>
        <title>About | Impossible Chess</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Header />
      <section className="hero">
        <div className="container">
          <h1>
            About <span>Impossible Chess</span>
          </h1>
        </div>
      </section>
      <section className="faq">
        <div className="container">
          <div className="faq__item">
            <h1>What is Impossible Chess?</h1>
            <p>
              Impossible Chess is a game of survival. We have set up the world's
              best chess engine, Stockfish, to destroy all of the humans in
              chess. Even Grand Masters.
            </p>
          </div>
          <div className="faq__item">
            <h1>How hard is Impossible Chess?</h1>
            <p>
              We are almost certain that no human is able to beat it.
              Stockfish's highest ELO is over 3500. The best player in the
              world, Magnus Carlsen, currently has an ELO of 2852 in blitz
              chess.
            </p>
          </div>
          <div className="faq__item">
            <h1>Who made Impossible Chess?</h1>
            <p>
              Impossible Chess was created by{" "}
              <a href="https://owenbick.com">Owen Bick</a> and{" "}
              <a href="https://mikemaquera.dev/">Mike Maquera</a>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export { About };
