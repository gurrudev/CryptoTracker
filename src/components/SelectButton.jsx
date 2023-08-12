import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

var selected1;

const useStyles = makeStyles(()=>({
    selectbutton:{
        border: '1px solid gold',
        borderRadius: '5px',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily:'Montserrat',
        cursor: 'pointer',
        backgroundColor: selected1 ? 'gold' : '',
        color: selected1 ? 'black' : '',
        fontWeight: selected1 ? 700 : 500,
        "&:hover": {
            backgroundColor : 'gold',
            color: 'black',
        },
        width: '22%',
    }
}))


function SelectButton({children, selected, onClick}) {

    console.log(selected)
    

    const classes = useStyles()
  return (
    <span onClick={onClick} className={classes.selectbutton}>
        {children}
    </span>
  )
}

export default SelectButton