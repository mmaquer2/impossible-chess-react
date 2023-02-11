import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";
import { DateTime } from "luxon";
import React from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';

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

export default function PostGameModal({ userScore }) {
  const [username, setUsername] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    if (username != "") {
      postResult();
    }

    setIsOpen(false);
  }

  function handle_username(value) {
    ///console.log(value);
    setUsername(value);
  }

  function print_username(value) {
    console.log(value);
  }

  async function postResult() {
    console.log("yeet");
    const app = initializeApp(firebaseConfig); // Initialize Firebase
    const db = getFirestore(app);
    const dt = DateTime.now();
    let today = dt.toLocaleString();

    //TODO: error validation for the baad word and empty username field

    const new_record = {
      user_name: username,
      score: 13,
      turns_played: 14,
      didWin: false,
      game_date: today,
    };

    //console.log("input username: " + username);

    const leaderboardDocRef = doc(db, "leaderboard", "data"); // get Reference to the leaderboard collection
    const docSnap = await getDoc(leaderboardDocRef); // get the latest version of the leaderboard data
    const leaderboardData = docSnap.data()["scores"];
    leaderboardData.push(new_record); // add the user socre to the list of scores

    // update the document in the firebase database
    await setDoc(doc(db, "leaderboard", "data"), {
      scores: leaderboardData,
    })
      .then(() => {
        console.log("updated leaderboard db successfully");
        //closeModal(); // close modal after submission is complete
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <button onClick={openModal}>Open Game Over Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Game Over Modal"
        style={customStyles}
        className='modal'
        closeTimeoutMS={500}
      >
        <div className="modal__container">
          <h3 className="red">GAME OVER</h3>
          <h3>You got checkmated!</h3>
          <p>You lasted 15 moves.</p>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Type in a username"
              onChange={(e) => {
                handle_username(e.target.value);
              }}
            />
            <button onClick={closeModal}>Submit</button>
          </form>
          <small>By clicking Submit, you agree to our <a href="/privacy-policy">privacy policy</a>.</small>
          <h4>Share on social media</h4>
          <div className="modal__social">
            <FacebookShareButton
              url={'impossiblechess.com'}
              quote={'Impossible Chess'}
              hashtag="#chess"
            >
              <FacebookIcon size={42} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={'impossiblechess.com #chess #impossiblechess'}
            >
              <TwitterIcon size={42} round />
            </TwitterShareButton>
          </div>
          <a className="close" onClick={closeModal}><MdClose /></a>
        </div>
      </Modal>
    </div>
  );
}
