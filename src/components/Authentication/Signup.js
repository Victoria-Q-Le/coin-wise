import { Box, Button, TextField } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { CoinState } from '../../CoinContext'
import { auth } from '../../config/firebase'



const Signup = ({handleClose}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const {setAlert} = CoinState()

  const handleSubmit = async () => {
   if(password !== confirmPassword){
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: 'error'
      })
      return
   }
   try {
    console.log(password, email);
    const result = await createUserWithEmailAndPassword(auth, email, password)
    setAlert({open: true, message: `Sign Up Successful. Welcome ${result.user.email}`})
    handleClose()
   } catch (error) {
    console.log("this line cant run")
   }
  }

  return (
   <Box p={3} style={{display: "flex", flexDirection: "column", gap: "20px"}}>
      <TextField variant='outlined' type="email" label="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth></TextField>
      <TextField variant='outlined' type="password" label="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth></TextField>
      <TextField variant='outlined' type="password" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth></TextField>
      {/* END OF SIGN UP FIELD */}

      <Button variant='contained' size='large' style={{backgroundColor: "#eebc1d"}} onClick={handleSubmit}>Sign Up</Button>
    </Box>
  )
}

export default Signup
