import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoContext } from '../CryptoContext'
import { Container, LinearProgress, Table, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@material-ui/core'

function CoinsTable() {

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
const [search, setSearch]= useState("")

    const {currency} = useContext(CryptoContext)

    const fetchCoins = async () => {
        setLoading(true)
        const {data} = await axios.get(CoinList(currency));

        setCoins(data)
        setLoading(false)
    }

    useEffect(()=>{
        fetchCoins()
    },[currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark',
        },
    });
    

    console.log(coins)
  return (
    <>
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign: "center"}}>
                <Typography variant='h4'
                    style={{marginTop: 18, fontFamily:'Montserrat'}}
                >
                    Crypto Currency  Prices by Market Cap
                </Typography>

                <TextField 
                    label='Search For a Crypto Currency'
                    variant='outlined'
                    style={{marginBottom:20, marginTop:20, width:'100%'}}
                    onChange={(e)=> setSearch(e.target.value)}
                />

                <TableContainer>
                    {
                        loading?(
                            <LinearProgress style={{backgroundColor: 'gold'}}/>
                        ) :(
                            <Table>
                                <TableHead style={{backgroundColor: '#eebc1d'}}>
                                    <TableRow>
                                        {['Coin', 'Price', '24 Change', 'Market Cap', ].map((head)=>(
                                            <TableCell style={{
                                                color: "black",
                                                fontWeight: 700,
                                                fontFamily: 'Montserrat',

                                            }}
                                            key={head}
                                            align={head === 'Coin' ? '' : 'right'}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                            </Table>
                        )
                    }
                </TableContainer>
            </Container>
        </ThemeProvider>
    </>
  )
}

export default CoinsTable