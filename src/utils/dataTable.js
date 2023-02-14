import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../api/firebase";
import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, usePagination } from 'react-table';
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
    const app = initializeApp(firebaseConfig); // Initialize Firebase
    const db = getFirestore(app);
    const fetchData = async () => {
      const leaderboardDocRef = doc(db, "leaderboard", "data"); // get Reference to the leaderboard collection
      const docSnap = await getDoc(leaderboardDocRef); // get the leaderboard data
      console.log("leaderboard data fetched successfully");
      // sort the list by the highest turn score
      const data = docSnap.data()["scores"];

      // TODO: only display the top 20 players from the leaderboard on the game page

      data.sort(GetSortOrder("turns_played")).reverse();
      setLeaderboard(data); // set leaderboard state
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <ScoreTable data={leaderboard} />
    </>
  );
}
