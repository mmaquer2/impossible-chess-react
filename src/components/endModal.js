import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { firebaseConfig } from "../api/firebase";
import { DateTime } from "luxon";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

var Filter = require("bad-words");

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

export default function PostGameModal({ finalScore }) {
  const [username, setUsername] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [errorFeedback, setErrorFeedback] = React.useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  useEffect(() => {
    // check if the user is logged in to render login buttons on modal after game completion
    const user = auth.currentUser;
    if (user != null || user != undefined) {
      setIsUserLoggedIn(true);
    }
    openModal();
  }, []);

  function signInWithGoogle(e) {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("login success")
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        //const user = result.user;
        //console.log("user: " + user);
        //console.log("token: " + token);
      })
      .catch((error) => {
        const errorCode = error.code;
        //const errorMessage = error.message;
        //const email = error.email;
        //const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("error during login: " + errorCode);
        //console.log("error message: " + errorMessage);
        //console.log("email: " + email);
        //console.log("credential: " + credential);
      });
  }

  function signInWithTwitter() {}

  function signInWithFacebook() {}

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // check if username is valid here
    let BadWordsFilter = new Filter(); // bad word filter check here
    if (BadWordsFilter.isProfane(username)) {
      console.log("username is profane");
      setErrorFeedback("Please enter a valid username");
      return;
    }

    if (username == null || username == undefined || username == "") {
      console.log("username is not valid");
      setErrorFeedback("Please enter a valid username");
    } else {
      setErrorFeedback(""); // clear the error feedback
      postResult();

    }
  }

  function handle_username(value) {
    setUsername(value);
  }

  async function postResult() {
    const db = getFirestore(app);
    const dt = DateTime.now();
    let today = dt.toLocaleString();
    const user = auth.currentUser;

    // check if the user is logged in
    if (user != null || user != undefined) {
      //console.log(user.email);
      //console.log(user.displayName);
      //console.log("user is logged in");

      const new_record = {
        user_name: username,
        score: finalScore,
        turns_played: finalScore,
        didWin: false,
        game_date: today,
      };

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

      closeModal(); // close modal after submission is complete
    } else {
      console.log(" cannot submit score user is not logged in");
      setErrorFeedback("Please login with google to submit your score");
    }
  }

  // Add this button into the dom for testing
  // <button onClick={openModal}>Open Game Over Modal</button>

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Game Over Modal"
        style={customStyles}
        className="modal"
        closeTimeoutMS={500}
      >
        <div className="modal__container">
          <h3 className="red">GAME OVER</h3>
          <h3>You got checkmated!</h3>
          <p>You lasted {finalScore} moves.</p>
          <p>{errorFeedback}</p>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Type in a username"
              onChange={(e) => {
                handle_username(e.target.value);
              }}
            />

            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              {" "}
              Submit
            </button>
          </form>
          <small>
            By clicking Submit, you agree to our{" "}
            <a href="/privacy-policy">privacy policy</a>.
          </small>
          <h4>Share on social media</h4>
          <div className="modal__social">
            {isUserLoggedIn ? (
              <div></div>
            ) : (
              <button
                onClick={(e) => {
                  signInWithGoogle(e);
                }}
              >
                Login With Google
              </button>
            )}

            <FacebookShareButton
              url={"impossiblechess.com"}
              quote={"Impossible Chess"}
              hashtag="#chess"
            >
              <FacebookIcon size={42} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={"impossiblechess.com #chess #impossiblechess"}
            >
              <TwitterIcon size={42} round />
            </TwitterShareButton>
          </div>
          <a className="close" onClick={closeModal}>
            <MdClose />
          </a>
        </div>
      </Modal>
    </div>
  );
}
