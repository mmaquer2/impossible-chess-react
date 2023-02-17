import React, { useEffect } from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "200%",
    width: "200%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function Header({ openStatus }) {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (openStatus === "open") {
      openModal();
    }
  }, []);
  return (
    <>
      <div className="header__ad">AD HERE</div>
      <header className="header">
        <div className="container">
          <div className="header__logo">
            <a href="/">
              <span className="header__logo__text">Impossible Chess</span>
            </a>
          </div>
          <ul className="header__list">
            <li className="header__item">
              <a className="header__link" href="/leaderboard">
                Leaderboard
              </a>
            </li>
            <li className="header__item">
              <a className="header__link" href="/about">
                About
              </a>
            </li>
            <li className="header__item">
              <a className="header__link" onClick={setIsOpen}>
                Login or Sign Up
              </a>
            </li>
          </ul>
        </div>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Welcome Modal"
        style={customStyles}
        className="modal"
      >
        <div className="modal__container">
          <h3>How To Play</h3>
          <p>How long can you last against the world's hardest chess bot?</p>
          <ul>
            <li>You play the black pieces.</li>
            <li>This chess bot's estimated ELO is over 3500.</li>
            <li>You will lose quickly.</li>
            <li>See how many turns you have made at the top right.</li>
            <li>
              Compete against the world leaderboard of the longest games without
              getting checkmated.
            </li>
          </ul>
          <span>Good luck.</span>
          <a className="close" onClick={closeModal}>
            <MdClose />
          </a>
        </div>
      </Modal>
    </>
  );
}
