import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { YEARS } from "../../config";
import { setYear } from "../redux/ducks/chartData";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Year() {
  const dispatch = useDispatch();

  //const [year, setYear] = useState(()=> { return 0});

  const handleYearChange = (value) => {
    console.log(value);
    value ? dispatch(setYear(value)) : dispatch(setYear(undefined));
  };

  return (
    <div className="goal">
      <FormControl variant="standard" style={{ minWidth: 130, color: "black" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Select Year
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={(e) => handleYearChange(e.target.value)}
          label="Year"
        >
          <MenuItem value="">Select any Goal</MenuItem>
          {YEARS.map((year) => (
          <MenuItem value={year} key={year}>
            {year}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </div>
  );
}
