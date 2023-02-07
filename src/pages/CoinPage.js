import { Button, LinearProgress, styled, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {CoinState} from '../CoinContext'
import CoinInfo from '../components/CoinInfo'
import { SingleCoin } from '../config/api'
import parse from 'html-react-parser'
import {numberWithCommas} from "../components/Carousel"
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'


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
        flexDirection: "column",
        alignItems: "center"
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
    
    const {currency, symbol, user, watchlist, setAlert} = CoinState()

    const inWatchlist = watchlist.includes(coin?.id)

    const addToWatchlist = async() => {
        const coinRef = doc(db, "watchlist", user.uid)
        try {
            await setDoc(coinRef, {coins: watchlist ? [...watchlist, coin.id] : [coin?.id]})
            setAlert({
                open: true,
                message: `${coin.name} has been added to your watch list`,
                type: 'success'
            })
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error'
            })
        }
    }

    const removeFromWatchlist = async() => {
        const coinRef = doc(db, "watchlist", user.uid)
        try {
            await setDoc(coinRef, {coins: watchlist.filter((watch) => watch !== coin?.id)}, {merge: "true"}) //filter out any coin that match the coin id to remove it from the watch list and merge the rest of the list together
            setAlert({
                open: true,
                message: `${coin.name} has been has been removed from your watch list`,
                type: 'success'
            })
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error'
            })
        }
    }

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

                    {user && (
                        <Button 
                            variant='outlined'
                            style={{width: "100%", height: 40, backgroundColor: inWatchlist ? "#ff0000" : "#eebc1d"}}
                            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
                         
                        >
                            {inWatchlist ? "Remove from Watch List" : "Add to Watch List"}
                        </Button>
                    ) }
                </DivMarketData>

            </DivSideBar>
            {/* END OF SIDE BAR */}

            
            <CoinInfo coin={coin}/>
        </DivContainer>
    )
}

export default CoinPage
