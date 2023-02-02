import { LinearProgress, styled, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {CoinState} from '../CoinContext'
import CoinInfo from '../components/CoinInfo'
import { SingleCoin } from '../config/api'
import parse from 'html-react-parser'
import {numberWithCommas} from "../components/Carousel"


const DivContainer = styled("div")(({theme}) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center"
    }
}))

const DivMarketData = styled("div")(({theme}) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around"
    },
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center"
    },
    [theme.breakpoints.down("xs")]: {
        alignItems: "start"
    }
}))

const DivSideBar = styled("div")(({theme})=> ({
    width: "30%",
    [theme.breakpoints.down("md")]:{
        width: "100%"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey"
}))

const HeadingTypography = styled(Typography)({
    fontWeight: "bold",
    marginBottom: 20
})

const DescriptionTypography = styled(Typography)({
    width: "100%",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify"
})


const CoinPage = () => {
    const {id} = useParams() 
    
    const [coin, setCoin] = useState()
    const [description, setDescription] = useState("")
    
    const {currency, symbol} = CoinState()

    useEffect(() => {
        const fetchCoin = async () => {
            const {data} = await axios.get(SingleCoin(id))
            setCoin(data)
            setDescription(data.description.en.split(". ")[0]) //split the description to shorten the description, then convert it into string to parse later
        }
        fetchCoin()
    },[id])

    if(!coin) return <LinearProgress style={{backgrounColor: "gold"}}/>

    return (
        <DivContainer>
            <DivSideBar>
                <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom: 20}} />
                <HeadingTypography variant='h3'>{coin?.name}</HeadingTypography>
                <DescriptionTypography variant='subtitle1'> {parse(description)} </DescriptionTypography>

                <DivMarketData>
                    <span style={{display: "flex"}}>
                        <HeadingTypography variant='h5'> Rank: </HeadingTypography>
                        &nbsp; &nbsp;
                        <Typography variant='h5'>{coin?.market_cap_rank}</Typography>
                    </span>

                    <span style={{display: "flex"}}>
                        <HeadingTypography variant='h5'> Current Price:  </HeadingTypography>
                        &nbsp; &nbsp;
                        <Typography variant='h5'>{symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])} </Typography>
                    </span>

                    <span style={{display: "flex"}}>
                        <HeadingTypography variant='h5'> Market Cap: </HeadingTypography>
                        &nbsp; &nbsp;
                        <Typography variant='h5'>{symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))} M</Typography>
                    </span>
                </DivMarketData>

            </DivSideBar>
            {/* END OF SIDE BAR */}

            
            <CoinInfo coin={coin}/>
        </DivContainer>
    )
}

export default CoinPage
