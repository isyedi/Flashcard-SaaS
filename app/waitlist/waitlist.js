// components/WaitlistModal.js

import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';

//import CloseIcon from '@mui/icons-material/Close';
import { db } from "@/firebase";
import { collection, addDoc } from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function WaitlistModal() {

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@') || !email.includes('.')) {
        setStatus('Please enter a valid email address.');
        return;
    }

    try {
        await addDoc(collection(db, 'waitlist'), {
        email
        });
        setStatus('Success! You are on the waitlist.');
        setEmail('');

    } catch (error) {
        console.error('Error adding document: ', error);
        setStatus('Error. Please try again.');
    }
  }

  return (
    <>
      <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleOpen}>
        Join Waitlist
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="waitlist-modal-title"
        aria-describedby="waitlist-modal-description"
      >
        <Box sx={style}>
          {/* <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box> */}
          <Typography id="waitlist-modal-title" variant="h6" component="h2">
            Join Our Waitlist
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              label="Enter your email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
          {status && (
            <Typography variant="body2" color="textSecondary" mt={2}>
              {status}
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  )
}
