import { Home } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    <Box flex={1} p={2} sx={{display: {xs : "none", sm: "block"}}}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href='/'>
            <ListItemIcon>
                <Home />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default Sidebar
