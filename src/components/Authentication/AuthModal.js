import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Tab, Tabs, styled } from '@mui/material';
import { TabPanel } from '@mui/lab';
import Signup from '../Authentication/Signup'
import Login from '../Authentication/Login'

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

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  console.log(value)

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
            {value === 0 && <Login/> }
            {value === 1 && <Signup/> }
           
          </PaperDiv>
        </Fade>
      </StyledModal>
    </div>
  );
}

