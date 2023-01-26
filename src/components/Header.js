import { AppBar, Container, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Header = () => {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)


  return (
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography> Coin Wise </Typography>
          </Toolbar>
        </Container>
      </AppBar>
  )
}

export default Header
