import React from "react";
import { useDispatch } from "react-redux";
import { GOALS_LIST } from "../../config";
import {setGoal} from '../redux/ducks/chartData'

export default function Goal() {

  const dispatch = useDispatch()
  
  const handleGoalChange = (value) => {
    console.log(value)
    value ? dispatch(setGoal(value)) : dispatch(setGoal(undefined))
  }

  return (
    <div className="goal">
      <select onChange={e => handleGoalChange(e.target.value)}>
        <option value={''}>Select Goal</option>
        {GOALS_LIST.map((goal) => (
          <option value={goal.split(':').shift()}>{goal}</option>
        ))}
      </select>
    </div>
  );
}
