import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Welcome() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Welcome Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Welcome! </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Welcome to Impossible chess
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Start Game</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );

}