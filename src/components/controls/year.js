import React, { useState } from "react";
import { YEARS } from "../../config";

export default function Year() {
  const [year, setYear] = useState(()=> { return 0});

  const handleYearChange = async (value) => {
    console.log(value)
    isNaN(value) ? setYear(0) : setYear(value)
  }

  return (
    <div className="goal">
      <select
        onChange={(e) => handleYearChange(e.target.value)}
      >
        <option>Select Year</option>
        {YEARS.map((goal) => (
          <option value={goal}>{goal}</option>
        ))}
      </select>
    </div>
  );
}
