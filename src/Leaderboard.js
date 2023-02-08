// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";
import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig); // Initialize Firebase
    const db = getFirestore(app);
    const fetchData = async () => {
      const leaderboardDocRef = doc(db, "leaderboard", "scores"); // get Reference to the leaderboard collection
      const docSnap = await getDoc(leaderboardDocRef); // get the leaderboard data
      console.log("leaderboard data fetched successfully");
      setLeaderboard(docSnap.data()["data"]); // set leaderboard state
    };

    fetchData().catch(console.error);
  }, []);

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

  /*
         {leaderboard.forEach((el) => {
              return (
                <tr key={el.user_name}>
                  <td>{el.user_name}</td>
                  <td>{el.turns_played}</td>
                  <td>1/31/23</td>
                </tr>

              )
            })}
  */

  return (
    <>
      <div className="chess__leaderboard">
        <div className="chess__leaderboard__header">
          <h3>Leaderboard</h3>
        </div>
        <table className="chess__leaderboard__list">
          <thead>
            <tr>
              <th>Username</th>
              <th>Turns</th>
              <th>Date</th>
            </tr>
          </thead>

          {test_data.map((el, index) => (
            <tr key={index}>
              <td>{el["user_name"]}</td>
              <td>{el["turns_played"]}</td>
              <td>{el["game_date"]}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}
