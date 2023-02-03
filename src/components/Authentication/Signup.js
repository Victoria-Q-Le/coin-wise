import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const Signup = ({handleClose}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = () => {
   
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
