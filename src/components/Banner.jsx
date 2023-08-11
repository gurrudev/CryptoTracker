import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import { Container, Typography } from '@material-ui/core'
import Carousal from './Carousal'
const styles = makeStyles(()=>({
    banner :{
        backgroundImage : "url(./bannerBg.jpg) ",
        backgroundSize: `cover`
    },
    bannerContent :{
        height:400,
        display: "flex",
        flexDirection : "column",
        paddingTop : 25,
        justifyContent: "space-around",
    },
    tagline:{
        display: "flex",
        height: "40%",
        flexDirection : "column",
        justifyContent: "center",
        textAlign: "center",
    }
}))

function Banner() {

    const classes = styles() 
    
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                    variant='h2'
                    style={{
                        fontWeight: 'bold',
                        marginBottom: '15px',
                        fontFamily: "Montserrat",
                    }}
                >
                    Crypto Tracker
                </Typography>
                <Typography style={{
                        fontFamily: "Montserrat",
                    }}>
                    Get all the Info regarding your favorite Crypto Currency
                </Typography>
            </div>
            <Carousal/>
        </Container>
    </div>
  )
}

export default Banner