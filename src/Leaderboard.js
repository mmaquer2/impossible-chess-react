// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";
import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const app = initializeApp(firebaseConfig); // Initialize Firebase
  const db = getFirestore(app);

  let test_data = [
    {
      user_name: "mike",
      turns_played: "9",
      game_date: "1/31/23",
    },
    {
      user_name: "kevin",
      turns_played: "9",
      game_date: "1/31/23",
    },
    {
      user_name: "brien",
      turns_played: "11",
      game_date: "2/21/23",
    },
  ];

  //fetch_leaderboard_data();

  async function fetch_leaderboard_data() {
    const leaderboardDocRef = doc(db, "leaderboard", "scores"); // get Reference to the leaderboard collection
    const docSnap = await getDoc(leaderboardDocRef); // get the leaderboard data
    setLeaderboard(docSnap.data()["data"]); // set leaderboard state
    console.log(leaderboard);
  }

  function print_leaderboard_data() {
    leaderboard.forEach((el) => {
      console.log(el["user_name"]);
      console.log(el["score"]);
    });
  }

  /*
    // add these buttons to the DOM to test database connection


        {test_data.map((el) =>
           <tr> 
            <th>{el["user_name"]}</th>
            <th>{el["turns_played"]}</th>
            <th>{el["game_data"]}</th>   
          </tr>
        )}
         

    
  */

  return (
    <>
      <div className="chess__leaderboard">
        <div className="chess__leaderboard__header">
          <h3>Leaderboard</h3>
        </div>
        <table className="chess__leaderboard__list">
          <tr>
            <th>Username</th>
            <th>Turns</th>
            <th>Date</th>
          </tr>

          {test_data.map((el, index) => (
            <tr key={index}>
              <td>{el["user_name"]}</td>
              <td>{el["turns_played"]}</td>
              <td>{el["game_date"]}</td>
            </tr>
          ))}
        </table>
      </div>
      <button onClick={print_leaderboard_data}> Test Print Data </button>
      <button onClick={fetch_leaderboard_data}> Test Fetch Data </button>
    </>
  );
}
