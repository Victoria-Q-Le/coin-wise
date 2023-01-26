import React from 'react'
import { useParams } from 'react-router-dom'



const CoinPage = () => {
    const {id} = useParams() 
    
    return (
        <div>
            This is the {id} coin page
        </div>
    )
}

export default CoinPage
