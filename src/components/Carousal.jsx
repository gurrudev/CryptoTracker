import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TrendingCoins } from '../config/api'
import { CryptoContext } from '../CryptoContext'
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import numberWithCommas from '../helper/numberWithCommas'

const styles = makeStyles(()=>({
    carousal : {
        height:"50%",
        display:"flex",
        alignItems:"center",
    },
    corousalItem : {
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "#fff",
        fontFamily: "Montserrat"
    }
}))



function Carousal() {

    const [trending, setTrending] = useState([])
    const classes = styles()

    const {currency, symbol} = useContext(CryptoContext)

    const fetchTrandingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }

    console.log(trending)
    
    useEffect(()=>{
        fetchTrandingCoins()
    },[currency])

    

    const items = trending.map((coin)=>{

        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link className={classes.corousalItem} to={`/coins/${coin.id}`}>
                <img 
                    src={coin?.image} 
                    alt={coin?.name}
                    height='80'
                    style={{marginBottom: '10px'}} 

                />
                <span>{coin?.symbol}&nbsp;
                    <span style={{
                        color: profit > 0 ? "rgb(14,203,129)" : "red",
                        fontWeight: 500
                    }}>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)} %
                    </span>
                </span>

                <span style={{fontSize: 22, fontWeight: 500}}>
                   {symbol}  {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0:{
            items: 2,
        },
        512:{
            items: 4,
        }
    }
  return (
    <div className={classes.carousal}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            responsive={responsive}
            autoPlay
            disableButtonsControls
            items={items}
        />
    </div>
  )
}

export default Carousal