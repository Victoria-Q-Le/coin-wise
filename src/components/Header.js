import { AppBar, Container, createTheme, MenuItem, Select, styled, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const StyledTypography = styled(Typography)({
  flex: 1,
  color: "gold",
  fontWeight: "bold",
  cursor: "pointer"
})

const Header = () => {

  const navigate = useNavigate()

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark"
    }
  })
  
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <StyledTypography onClick={() => navigate("/")} variant="h6"> Coin Wise </StyledTypography>

            <Select variant='outlined' style={{width:100, height:40, marginRight: 15}}>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"VND"}>VND</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
