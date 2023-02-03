import { Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { CoinState } from '../CoinContext'
import MuiAlert from '@mui/material/Alert';


const Alert = () => {

    const {alert, setAlert} = CoinState()


    const handleClose = (event, reason) => {
        if(reason === "clickaway"){
            return
        }
        setAlert({open: false}) //because alert has the prop open, when close the alert this will set open prop to false 
    }
  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} elevation={10} variant="filled" severity={alert.type}>
            {alert.message}
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

export default Alert
