import { CircularProgress, createTheme, styled, ThemeProvider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto' //this to fix an error, chart wont display without this line
import { CoinState } from '../CoinContext'
import { HistoricalChart } from '../config/api'
import {chartLength} from '../config/data'
import SelectButton from './SelectButton'

const CoinInfo = ({coin}) => {

    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(1)

    const {currency} = CoinState()

    useEffect(() => {
        const fetchHistoricData = async() => {
            const {data} = await axios.get(HistoricalChart(coin.id, days, currency))
            setHistoricData(data.prices)
            console.log(data.prices);
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

    console.log(ChartJS)
    console.log(days)

  return (
   <ThemeProvider theme={darkTheme}>
    <DivContainer>
        {!historicData 
            ? (<CircularProgress style={{color: "gold"}} size={250} thickness={1} />)
            : <>
                <Line
                    data={{
                        labels: historicData.map((coin) => {
                        let date = new Date(coin[0]);
                        let time =
                            date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                            : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                        }),

                        datasets: [
                        {
                            data: historicData.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days ) in ${currency}`,
                            borderColor: "#EEBC1D",
                        },
                        ],
                    }}
                    options={{
                        elements: {
                        point: {
                            radius: 1,
                        },
                        },
                    }}
            />

                <div style={{display: "flex", marginTop: 20, justifyContent: "space-around", width: "100%"}}>
                    {chartLength.map(option => (
                        <SelectButton 
                            key={option.value} 
                            onClick={() => setDays(option.value)}
                            selected={option.value === days}
                        >
                            {option.label}
                        </SelectButton>
                    ))}
                </div>
            </>
        }
    </DivContainer>
   </ThemeProvider>
  )
}

export default CoinInfo
