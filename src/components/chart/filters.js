import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: "5px",
    border: "5px",
    margin:"5px"
  },
}));

const Filters = ({ filter, setFilter, dataToDisplay, chartDataValues, setDataToDisplay }) => {
  const classes = useStyles();

  const disabled = !chartDataValues;

  const statesAndUT = useSelector(state => state.chartData.statesAndUT)

  useEffect(()=>{
    console.log(statesAndUT["Delhi"] == filter)
    if (chartDataValues){
      const tempArray = chartDataValues.filter(items => 
        statesAndUT[items.area_name] == filter.toString()
      )
      console.log(tempArray)
      setDataToDisplay(tempArray)
    } else {
      setDataToDisplay(null)
    }
    
    
  },[filter, chartDataValues])

  
  const onClickState = () => {
    setFilter(()=>"STATE");
  };

  const onClickUT = () => {
    setFilter(()=>"UT");
  };

  return (
    <>
      {/* <Button
        variant="contained"
        disabled={disabled}
        className={classes.button}
      >
        All
      </Button> */}
      <Button variant="contained"  disabled={disabled} className={classes.button} onClick={onClickState}>
        States
      </Button>
      <Button variant="contained" color="secondary" disabled={disabled} className={classes.button} onClick={onClickUT}>
        UTs
      </Button>
    </>
  );
};

export default Filters;
