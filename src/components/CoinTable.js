import React, {useEffect, useState } from 'react'
import { CoinState } from '../CoinContext'
import { Pagination } from '@mui/lab'
import { Container, createTheme, LinearProgress, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from './Carousel'

const StyledTableRow = styled(TableRow)({
  backgroundColor: "#16171a",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#131111"
  }
})

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    color: "gold"
  }
})

const CoinTable = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const navigate = useNavigate()
  
  const {currency, symbol, coins, loading, fetchCoins} = CoinState()

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {/* END OF TABLE HEAD */}

                <TableBody>
                  {handleSearch().slice((page -1)*10, (page - 1)*10 + 10).map((row) => {
                    const profit = row.price_change_percentage_24h > 0
                    return (
                      <StyledTableRow 
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          style={{display: "flex", gap: 15}}
                        >
                          <img  src={row.image} alt={row.name} height="50" style={{marginBottom: 10}} />
                          <div style={{display: "flex", flexDirection: "column"}}>
                            <span style={{textTransform: "uppercase", fontSize: 22}}> {row.symbol} </span>
                            <span style={{color: "darkgrey"}}> {row.name} </span>
                          </div>
                        </TableCell>
                        {/* END OF NAME AND SYMBOL CELL */}

                        <TableCell align='right'>
                          {symbol} {" "} {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        {/* END OF PRICE */}

                        <TableCell align='right' style={{ color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: 500}}>
                          {profit && "+"} {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        {/* END OF 24H CHANGE */}

                        <TableCell align='right'> 
                          {symbol}{" "} {numberWithCommas(row.market_cap.toString().slice(0, -6))} M 
                        </TableCell>
                        {/* END OF MARKET CAP */}
                      </StyledTableRow>
                    )
                  })}
                </TableBody>
              </Table>)
          }
        </TableContainer>
        {/* END OF COINS TABLE */}

       <StyledPagination 
          count={(handleSearch()?.length/10).toFixed(0)}
          style={{padding: 20, width: "100%", display: "flex", justifyContent: "center"}}
          onChange={(_, value) => {
            setPage(value)
            window.scroll(0,450)
          }}
        />

      </Container>
    </ThemeProvider>
  )
} 

export default CoinTable
