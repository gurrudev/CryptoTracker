import React, { useContext } from 'react';
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@material-ui/core/';
import { CryptoContext } from '../CryptoContext';
import { makeStyles } from '@material-ui/core/styles'
import { useNavigate } from 'react-router';
const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        type: 'dark',
    },
});

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: 'gold',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: 23,
    },
}));



function Header() {

    const classes = useStyles();
    const { currency, setCurrency } = useContext(CryptoContext); // Use useContext to access the CryptoContext values

    const navigate = useNavigate()
    
    console.log(currency)
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography className={classes.title} onClick={(e)=> navigate('/')}>CryptoTracker</Typography>

                        <Select
                            variant="outlined"
                            style={{
                                width: 100,
                                height: 40,
                                marginLeft: 15,
                            }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value='INR'>INR</MenuItem>
                            <MenuItem value='USD'>USD</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default Header;
