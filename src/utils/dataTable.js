import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { app, db } from "../firebase";
import React, { useState, useEffect } from "react";
import ScoreTable from "../components/Leaderboard";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  useEffect(() => {
    console.log("fetching leaderboard data");

    const fetchData = async () => {
      const leaderboardDocRef = doc(db, "leaderboard", "data"); // get Reference to the leaderboard collection
      const docSnap = await getDoc(leaderboardDocRef); // get the leaderboard data
      console.log("leaderboard data fetched successfully");
      // sort the list by the highest turn score
      const data = docSnap.data()["scores"];
      const sortedData = data.sort(GetSortOrder("turns_played")).reverse();
      setLeaderboard(sortedData); // set leaderboard state
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <ScoreTable data={leaderboard} />
    </>
  );
}
