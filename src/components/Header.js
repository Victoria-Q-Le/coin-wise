import { AppBar, Container, createTheme, MenuItem, Select, styled, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinState } from '../CoinContext'
import AuthModal from './Authentication/AuthModal'
import UserSideBar from './Authentication/UserSideBar'

const StyledTypography = styled(Typography)({
  flex: 1,
  color: "gold",
  fontWeight: "bold",
  cursor: "pointer"
})

const Header = () => {

  const navigate = useNavigate()

  const {currency, setCurrency, user} = CoinState()

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

            <Select variant='outlined' style={{width:100, height:40, marginRight: 15}} value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"VND"}>VND</MenuItem>
            </Select>
            {/* END OF CURRENCY SELECT */}

            { user ? <UserSideBar user={user} /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
