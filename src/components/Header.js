import React, { useEffect } from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import { FaTwitter, FaGoogle, FaFacebook } from "react-icons/fa";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../api/firebase";

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
  const provider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    if (openStatus === "open") {
      openModal();
    }
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  function signInWithTwitter() {
    console.log("signed in with twitter");
    /*
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;

      // The signed-in user info.
      const user = result.user;
      
      setIsLoggedIn(true);
    
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      // ...
    });
    */
  }

  function signInWithFacebook() {
    console.log("signed in with facebook");
    /*
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        
        setIsLoggedIn(true);
     
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
      */
  }

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        console.log("log out was successful");
        //console.log("user after logout call: "+ auth.currentUser)
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log("log out was not successful");
      });
  }

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
            {isLoggedIn ? (
              <li className="header__item">
                <a className="header__link" onClick={handleLogOut}>
                  Logout
                </a>
              </li>
            ) : (
              <li className="header__item">
                <a className="header__link" onClick={openModal}>
                  Login or Sign Up
                </a>
              </li>
            )}
          </ul>
        </div>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        style={customStyles}
        className="modal"
      >
        <div className="modal__container">
          <h1>Impossible Chess</h1>
          <p>
            Join our community of chess players and save your score to the global
            leaderboard.
          </p>
          {isLoggedIn ? (
            <button onClick={handleLogOut}>Logout</button>
          ) : (
            <div className="modal__auth">
              <button className="google" onClick={signInWithGoogle}>
                <FaGoogle /> Login With Google
              </button>
              <button className="twitter" onClick={signInWithTwitter}>
                <FaTwitter /> Login With Twitter
              </button>
              <button className="facebook" onClick={signInWithFacebook}>
                <FaFacebook /> Login With Facebook
              </button>
              <small>We'll never post to any of your accounts without your permission.</small>
            </div>
          )}
          <a className="close" onClick={closeModal}>
            <MdClose />
          </a>
        </div>
      </Modal>
    </>
  );
}
