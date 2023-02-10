import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";
import { DateTime } from "luxon";
import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
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
      >
        <label>
          Enter Username:
          <input
            type="text"
            name="name"
            onChange={(e) => {
              handle_username(e.target.value);
            }}
          />
        </label>

        <button onClick={closeModal}>Submit Username</button>

        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}
