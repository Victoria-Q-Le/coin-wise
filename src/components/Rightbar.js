import React from 'react'
import { Box } from '@mui/material'

const Rightbar = () => {
  return (
    <Box bgcolor="pink" flex={2} p={2} sx={{display: {xs : "none", sm: "block"}}}>
      Right Bar 
    </Box>
  )
}

export default Rightbar
