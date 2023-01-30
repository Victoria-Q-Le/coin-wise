import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {CoinList} from '../config/api'
import { CoinState } from '../CoinContext'
import { Container, createTheme, LinearProgress, Table, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'

const CoinTable = () => {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  
  const {currency} = CoinState()


  console.log(coins);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true)
      const {data} = await axios.get(CoinList(currency))
      setCoins(data)
      setLoading(false)
    }
    fetchCoins()
  }, [currency])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff'
      },
      mode: 'dark'
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{textAlign: "center"}}>
        <Typography
          variant='h4'
          style={{margin: 18}}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        {/* BEGIN OF SEACH BOX */}
        <TextField 
          label="Search For a Cryptocurrency" 
          variant='outlined' 
          style={{marginBottom: 20, width: "100%"}}
          onChange={(e) => setSearch(e.target.value)}/>
        {/* END OF SEARCH BOX */}

        {/* BEGIN OF COINS TABLE */}
        <TableContainer>
          {loading 
            ? (<LinearProgress  style={{backgroundColor: "gold"}}/>) 
            : (<Table>
            <TableHead style={{backgroundColor: "#EEBC1D"}}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{color:"black", fontWeight: "700"}}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              </Table>)
          }
        </TableContainer>
        {/* END OF COINS TABLE */}
      </Container>
    </ThemeProvider>
  )
} 

export default CoinTable
