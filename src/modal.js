import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../firebase-config";
import { DateTime } from "luxon";

export default function Modal({ userScore }) {
  const [username, setUsername] = ("");
  const [finalScore, setFinalScore] = (9)

  async function postResult() {
    const app = initializeApp(firebaseConfig); // Initialize Firebase
    const db = getFirestore(app);
    const dt = DateTime.now();
    let today = dt.toLocaleString();

    const new_record = {
      user_name: "lazyday2",
      score: this.turnCount,
      turns_played: this.turns,
      didWin: false,
      game_date: today,
    };

    // get the latest version of the leaderboard data
    const leaderboardDocRef = doc(db, "leaderboard", "scores"); // get Reference to the leaderboard collection
    const docSnap = await getDoc(leaderboardDocRef);
    const leaderboardData = docSnap.data();
    leaderboardData["data"].push(new_record); // add the user socre to the list of scores
    console.log(leaderboardData);

    // update the document in the firebase database
    await setDoc(doc(db, "leaderboard", "data"), {
      leaderboardData,
    })
      .then(() => {
        console.log("updated leaderboard db successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //TODO: add x to close the modal

  return (
    <>
      <p>Game Over you made it {finalScore} turns</p>
      <input></input>
      <button onClick={postResult}> Submit </button>
    </>
  );
}
