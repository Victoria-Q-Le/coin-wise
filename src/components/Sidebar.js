import { Box } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    <Box bgcolor="lightcoral" flex={1} p={2} sx={{display: {xs : "none", sm: "block"}}}>
      Side Bar 
    </Box>
  )
}

export default Sidebar
