import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Tab, Tabs, styled } from '@mui/material';
import Signup from '../Authentication/Signup'
import Login from '../Authentication/Login'
import { Box } from '@mui/system';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebase';

const PaperDiv = styled("div")(({theme}) => ({
  width: 400,
  backgroundColor: theme.palette.background.paper,
  color: "white",
  borderRadius: 10
}))

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})

const google = {
  padding: 24,
  paddingTop: 0,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 20,
  fontSize: 20
}

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const googleProvider = new GoogleAuthProvider()

  const signInWithGoogle = ( ) => {
    signInWithPopup(auth, googleProvider)
      .then(res => {
        alert(`You have been signed in as ${res.user.displayName}`)
        handleClose()
      })
  }

  return (
    <div>
      <Button 
        variant='contained' 
        onClick={handleOpen}
        style={{width: 85, height: 40, backgroundColor: "#eebc1d"}}>Login</Button>
      <StyledModal
        aria-labelledby="transition-StyledModal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <PaperDiv>
           <AppBar position='static' style={{backgroundColor: "transparent", color: "white"}}>
            <Tabs value={value} variant="fullWidth" style={{borderRadius: 10}} onChange={handleChange}>
              <Tab label="Login" value={0}/>
              <Tab label="Sign Up" value={1}/>
            </Tabs>
           </AppBar>
            {value === 0 && <Login handleClose={handleClose}/> }
            {value === 1 && <Signup handleClose={handleClose}/> }

            <Box style={google}>
              <span>OR</span>
              <Button style={{width: "100%", outline: "none"}} onClick={signInWithGoogle}> Sign In With Google </Button>
            </Box>
           
          </PaperDiv>
        </Fade>
      </StyledModal>
    </div>
  );
}

