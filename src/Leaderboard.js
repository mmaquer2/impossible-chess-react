import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";
import { useState, useEffect } from "react";
import ScoreTable from "./ScoreTable";

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

  return (
    <>
      <ScoreTable data={leaderboard} />
    </>
  );
}
