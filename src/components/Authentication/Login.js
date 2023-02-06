import { Box, Button, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { CoinState } from '../../CoinContext'
import { auth } from '../../config/firebase'



const Login = ({handleClose}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {setAlert} = CoinState()

  const handleSubmit = async () => {
    if(!email || !password){
       setAlert({
         open: true,
         message: "Please fill out all required fields",
         type: 'error'
       })
       return
    }
    try {
     const result = await signInWithEmailAndPassword(auth, email, password)
     setAlert({open: true, message: `Login Successful. Welcome ${result.user.email}`, type: "success"})
     handleClose()
    } catch (error) {
     setAlert({open: true, message: error.message, type: 'error'})
    }
   }

  return (
    <Box p={3} style={{display: "flex", flexDirection: "column", gap: "20px"}}>
      <TextField variant='outlined' type="email" label="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth></TextField>
      <TextField variant='outlined' type="password" label="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth></TextField>
      {/* END OF SIGN UP FIELD */}

      <Button variant='contained' size='large' style={{backgroundColor: "#eebc1d"}} onClick={handleSubmit}>Login</Button>
    </Box>
  )
}

export default Login
