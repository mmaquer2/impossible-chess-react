import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";
import { DateTime } from "luxon";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Modal({ userScore }) {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState("");
  
  
    const handleClickOpen = () => {
        setOpen(true);
    };

  const handleClose = () => {
    setOpen(false);
    };


    function handle_username(value){
        setUsername(value);
    }
  
   
  async function postResult() {
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

    console.log("input username: " + username);

    const leaderboardDocRef = doc(db, "leaderboard", "data"); // get Reference to the leaderboard collection
    const docSnap = await getDoc(leaderboardDocRef); // get the latest version of the leaderboard data
    const leaderboardData = docSnap.data()["scores"]
    leaderboardData.push(new_record); // add the user socre to the list of scores
    
    
    // update the document in the firebase database
    await setDoc(doc(db, "leaderboard", "data"), {
        "scores" : leaderboardData
    })
      .then(() => {
        console.log("updated leaderboard db successfully");
        handleClose(); // close the dialog form once the post has succeeded
      })
      .catch((error) => {
        console.log(error);
      });

  }


  return (
    <div>
    <Button variant="outlined" onClick={handleClickOpen}>
        Open Username Input 
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit Score</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You Lost! You made it 9 Turns against stockfish!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="username"
            type="username"
            fullWidth
            variant="standard"
            onChange={(e) => {
                handle_username(e.target.value);
              }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={postResult}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

      



