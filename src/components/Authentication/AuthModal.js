import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Tab, Tabs } from '@mui/material';
import { TabPanel } from '@mui/lab';
import Signup from '../Authentication/Signup'
import Login from '../Authentication/Login'

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

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <Button 
        variant='contained' 
        onClick={handleOpen}
        style={{width: 85, height: 40, backgroundColor: "#eebc1d"}}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
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
          <Box sx={style}>
           <AppBar position='static' style={{backgroundColor: "transparent", color: "white"}}>
            <Tabs value={value} variant="fullWidth" style={{borderRadius: 10}} onChange={handleChange}>
              <Tab label="Login"></Tab>
              <Tab label="Sign Up"></Tab>
            </Tabs>
           </AppBar>
           {value === 0 && <Login/>}
           {value === 1 && <Signup/>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

