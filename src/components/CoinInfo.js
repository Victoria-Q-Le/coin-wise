import { CircularProgress, createTheme, styled, ThemeProvider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { CoinState } from '../CoinContext'
import { HistoricalChart } from '../config/api'

const CoinInfo = ({coin}) => {

    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(1)

    const {currency} = CoinState()

    useEffect(() => {
        const fetchHistoricData = async() => {
            const {data} = await axios.get(HistoricalChart(coin.id, days, currency))
            setHistoricData(data.prices)
        }
        fetchHistoricData()
    },[days, currency, coin.id])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            mode: "dark"
        }
    })

    const DivContainer = styled("div")(({theme}) => ({
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0
        }
    }))

  return (
   <ThemeProvider theme={darkTheme}>
    <DivContainer>
        {!historicData 
            ? (<CircularProgress style={{color: "gold"}} size={250} thickness={1} />)
            : <>
                 
                This is the price chart

            </>
        }
    </DivContainer>
   </ThemeProvider>
  )
}

export default CoinInfo
