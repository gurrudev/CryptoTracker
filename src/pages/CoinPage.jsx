import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoContext } from '../CryptoContext'
import axios from 'axios'
import { SingleCoin } from '../config/api'
import { makeStyles } from '@material-ui/core/styles'
import CoinInfo from '../components/CoinInfo'
import { LinearProgress, Typography } from '@material-ui/core'
import numberWithCommas from '../helper/numberWithCommas'
import Parser from 'html-react-parser'


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },

  sidebar: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid gray'
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  description: {
    width: '100%',
    padding: 25,
    paddingBottom: 25,
    paddingTop: 0,
    textAlign: 'justify',
    fontFamily: 'Montserrat',
  },
  marketData :{
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',
    [theme.breakpoints.down('md')]:{
      display: 'flex',
      justifyContent: 'space-around',
    },
    [theme.breakpoints.down('sm')]:{
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]:{
      alignItems: 'start',
    }
  }
}))


function CoinPage() {

  const { id } = useParams()
  const [coin, setCoin] = useState()

  const { currency, symbol } = useContext(CryptoContext)

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))

    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()

  }, [])

  console.log(coin)

 
  const classes = useStyles()
  
  if(!coin) return <LinearProgress style={{backgroundColor: 'gold'}}/>

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img src={coin?.image.large}
          alt={coin?.name}
          height={200}
          style={{ marginBottom: 20 }}
        />
        <Typography variant='h3' className={classes.heading}>{coin?.name}</Typography>
        <Typography variant='subtitle1' className={classes.description}>{Parser(coin?.description.en.split(". ")[0])}.</Typography>
        <div className={classes.marketData}>
          <span style={{display: 'flex', gap:'1rem'}}>
            <Typography variant='h5' className={classes.heading}>Rank :</Typography>
            <Typography variant='h5' style={{fontFamily:'Montserrat'}}>{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{display: 'flex', gap:'1rem'}}>
            <Typography variant='h5' className={classes.heading}>Current Price :</Typography>
            <Typography variant='h5' style={{fontFamily:'Montserrat'}}>{symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
          </span>
          <span style={{display: 'flex', gap:'1rem'}}>
            <Typography variant='h5' className={classes.heading}>Market Cap :</Typography>
            <Typography variant='h5' style={{fontFamily:'Montserrat'}}>{symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))} M</Typography>
          </span>
        </div>
      </div>
      <CoinInfo />
    </div>
  )
}

export default CoinPage