import React from "react";
import { useDispatch } from "react-redux";
import { GOALS_LIST } from "../../config";
import {setGoal} from '../redux/ducks/chartData'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Goal() {

  const dispatch = useDispatch()
  
  const handleGoalChange = (value) => {
    console.log(value)
    value ? dispatch(setGoal(value)) : dispatch(setGoal(undefined))
  }

  return (
    <div className="goal">
      <FormControl  variant="standard" style={{"minWidth":130, "color":"black"}}>
      <InputLabel id="demo-simple-select-standard-label">Select a Goal</InputLabel>
      <Select 
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      onChange={e => handleGoalChange(e.target.value)}
      label="Goal"
      >
        <MenuItem value=''>Select any Goal</MenuItem>
        {GOALS_LIST.map((goal) => (
          <MenuItem value={goal.split(':').shift()} key={goal}>{goal}</MenuItem>
        ))}

      </Select>
      </FormControl>
      {/* <select onChange={e => handleGoalChange(e.target.value)}>
        <option value={''}>Select Goal</option>
        {GOALS_LIST.map((goal) => (
          <option value={goal.split(':').shift()} key={goal}>{goal}</option>
        ))}
      </select> */}
    </div>
  );
}
