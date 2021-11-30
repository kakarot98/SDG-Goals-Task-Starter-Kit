import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { YEARS } from "../../config";
import {setYear} from '../redux/ducks/chartData'

export default function Year() {
  const dispatch = useDispatch()

  //const [year, setYear] = useState(()=> { return 0});

  const handleYearChange = (value) => {
    console.log(value)
    value ? dispatch(setYear(value)) : dispatch(setYear(undefined))
  }

  return (
    <div className="goal">
      <select
        onChange={(e) => handleYearChange(e.target.value)}
      >
        <option value={''}>Select Year</option>
        {YEARS.map((year) => (
          <option value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}
