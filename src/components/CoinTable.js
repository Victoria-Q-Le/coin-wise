import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {CoinList} from '../config/api'
import { CoinState } from '../CoinContext'
import { Container, createTheme, LinearProgress, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const CoinTable = () => {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const navigate = useNavigate()
  
  const {currency} = CoinState()


  console.log(coins, search);

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

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    ))
  }

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
                        align={head === "Coin" ? "justify" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch().map((row) => {
                    const profit = row.price_change_percentage_24h > 0
                    return (
                      <TableRow 
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          styles={{display: "flex", gap: 15}}
                        >
                          <img  src={row.image} alt={row.name} height="50" style={{marginBottom: 10}} />
                          <div style={{display: "flex", flexDirection: "column"}}>
                            <span style={{textTransform: "uppercase", fontSize: 22}}> {row.symbol} </span>
                            <span style={{color: "darkgrey"}}> {row.name} </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>)
          }
        </TableContainer>
        {/* END OF COINS TABLE */}
      </Container>
    </ThemeProvider>
  )
} 

export default CoinTable
