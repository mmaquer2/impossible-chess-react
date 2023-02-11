import React from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "200%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function Welcome() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Welcome Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Welcome Modal"
        style={customStyles}
        className='modal'
      >
        <div className="modal__container">
          <h3>How To Play</h3>
          <p>How long can you last against the world's hardest chess bot?</p>
          <ul>
            <li>You play the black pieces.</li>
            <li>This chess bot's estimated ELO is over 3500.</li>
            <li>You will lose quickly.</li>
            <li>See how many turns you have made at the top right.</li>
            <li>Compete against the world leaderboard of the longest games without getting checkmated.</li>
          </ul>
          <span>Good luck.</span>
          <div className="close"><MdClose /></div>
        </div>
      </Modal>
    </div>
  );
}
