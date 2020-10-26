import React from 'react';
import Paper from '@material-ui/core/Paper'
import classes from './Display.module.css'



const Display = (props) =>{
    return(
  
  <Paper className={classes.display}>
      <div className={classes.abovetext}>{props.abovetext}</div>
      <div className={classes.belowtext}>{props.belowtext}</div>
    </Paper>

    )
}

export default Display;