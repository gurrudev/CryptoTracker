import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoContext } from '../CryptoContext'
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import numberWithCommas from '../helper/numberWithCommas'
import { Pagination } from '@material-ui/lab'

function CoinsTable() {

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    const navigate = useNavigate()

    const { currency, symbol } = useContext(CryptoContext)

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));

        setCoins(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCoins()
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark',
        },
    });

    const handleSearch = () => {
        return coins.filter((coins) => (
            coins.name.toLowerCase().includes(search.toLowerCase()) || coins.symbol.toLowerCase().includes(search.toLowerCase())
        ))
    }

    // const useStyles = makeStyles(() => ({
    //     pagination:{
    //         "& .MuiPaginationItem-root":{
    //             color: 'gold',
    //         }
    //     }
    // }))

    // const classes = useStyles()


    console.log(coins)
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Container style={{ textAlign: "center" }}>
                    <Typography variant='h4'
                        style={{ marginTop: 18, fontFamily: 'Montserrat' }}
                    >
                        Crypto Currency Prices by Market Cap
                    </Typography>

                    <TextField
                        label='Search For a Crypto Currency'
                        variant='outlined'
                        style={{ marginBottom: 20, marginTop: 20, width: '100%', }}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <TableContainer>
                        {
                            loading ? (
                                <LinearProgress style={{ backgroundColor: 'gold' }} />
                            ) : (
                                <Table>
                                    <TableHead style={{ backgroundColor: '#eebc1d' }}>
                                        <TableRow>
                                            {['Coin', 'Price', '24 Change', 'Market Cap',].map((head) => (
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

                                    <TableBody>
                                        {handleSearch()
                                            .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                            .map((row) => {
                                                const profit = row.price_change_percentage_24h > 0;

                                                return (
                                                    <TableRow
                                                        onClick={() => navigate(`/coins/${row.id}`)}
                                                        className={''}
                                                        key={row.name}
                                                    >
                                                        <TableCell
                                                            component='th'
                                                            scope='row'
                                                            style={{ display: 'flex', gap: '15px' }}
                                                        >

                                                            <img
                                                                src={row?.image}
                                                                alt={row.name}
                                                                height={50}
                                                                style={{ marginBottom: 10, cursor: 'pointer' }}
                                                            />

                                                            <div
                                                                style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                                                            >
                                                                <span style={{ textTransform: 'uppercase', fontSize: 22, fontFamily: '' }}>
                                                                    {row.symbol}
                                                                </span>

                                                                <span style={{ color: 'darkgray' }}>
                                                                    {row.name}
                                                                </span>

                                                            </div>
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            {symbol}{' '}
                                                            {numberWithCommas(row.current_price.toFixed(2))}
                                                        </TableCell>

                                                        <TableCell align='right'
                                                            style={{ color: profit > 0 ? 'rgb(14, 203, 129)' : 'red', fontWeight: 500 }}
                                                        >
                                                            {profit && '+'}
                                                            {row.price_change_percentage_24h.toFixed(2)} %
                                                        </TableCell>

                                                        <TableCell align='right'>
                                                            {symbol} {' '}
                                                            {numberWithCommas(row.market_cap.toString().slice(0, -6))} M
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
                            )
                        }
                    </TableContainer>

                    <Pagination
                        count={(handleSearch()?.length / 10).toFixed(0)}
                        className={''}
                        style={{
                            padding: 20,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            color: 'gold',
                        }}
                        onChange={(_, value) => {
                            setPage(value);
                            window.scroll(0, 450)
                        }}
                    />
                </Container>
            </ThemeProvider>
        </>
    )
}

export default CoinsTable