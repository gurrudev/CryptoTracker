import React, { useContext, useEffect, useState } from 'react'
import { CryptoContext } from '../CryptoContext'
import axios from 'axios'
import { HistoricalChart } from '../config/api'
import { CircularProgress, ThemeProvider, createTheme, makeStyles } from '@material-ui/core'
import { Line } from 'react-chartjs-2'

const darkTheme = createTheme({
  palette: {
    primary: {
      main : '#fff'
    },
    type: 'dark'
  },
})

const useStyles = makeStyles((theme)=>({
  container:{
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding : 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      padding : 20,
      paddingTop: 0
    }
  }
}))



function CoinInfo({coin}) {
  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)

  const {currency} = useContext(CryptoContext)

const fetchHistoricalData = async () => {
  const {data} = await axios.get(HistoricalChart(coin.id, days, currency))
  setHistoricalData(data.prices)
}
console.log(historicalData)

useEffect(()=>{
  fetchHistoricalData()

},[currency, days])


const classes = useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !setHistoricalData?(
            <CircularProgress
              style={{color:'gold'}}
              size={250}
              thickness={1}
            />
          ):(
            <>
              
              
            </>
          )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo