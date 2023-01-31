import { styled } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {CoinState} from '../CoinContext'
import CoinInfo from '../components/CoinInfo'
import { SingleCoin } from '../config/api'


const DivContainer = styled("div")(({theme}) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center"
    }
}))

const DivSideBar = styled("div")({
    
})


const CoinPage = () => {
    const {id} = useParams() 
    
    const [coin, setCoin] = useState()
    
    const {currency, symbol} = CoinState()

    useEffect(() => {
        const fetchCoin = async () => {
            const {data} = await axios.get(SingleCoin(id))
            setCoin(data)
        }
        fetchCoin()
    },[id])

    console.log(coin);

    console.log(currency, symbol)
     

    return (
        <DivContainer>
            <DivSideBar>
                This is the side bar
            </DivSideBar>
            {/* END OF SIDE BAR */}

            <CoinInfo coin={coin}/>
        </DivContainer>
    )
}

export default CoinPage
