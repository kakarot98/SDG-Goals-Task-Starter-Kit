import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
//import jsonData from '../../data/2018.json'

export default function Chart() {
  const [data, setData] = useState();

  const [year, goal] = useSelector((state) => [
    state.chartData.year,
    state.chartData.goal,
  ]);

  useEffect(() => {
    const fetchData = async (year) => {
      await axios
        .get(`${year}.json`)
        .then((res) => setData(res.data))
        .then((res) => console.log(data))
        .catch((err) => console.log(err));
    };
    if (year && goal) {
      fetchData(year);
    } else if (!year | !goal) {
      setData(null);
    }
  });

  // useEffect(()=>{
  //  console.log(year)
  // },[])

  // const getData = async (year)=>{
  //   await axios.get(`${year}.json`).then(res=>console.log(res))
  // }

  //getData(2020)

  // const [sample] = [20,30,50,25,45,27]
  // const d3Chart = useRef();

  // useEffect(()=>{
  //   //container for svg
  //   const w = 400
  //   const h = 300
  //   const svg = d3.select(d3Chart.current)
  //   .attr('width', w)
  //   .attr('height', h)
  //   .style('overflow', 'visible')
  //   .style('margin-top', '75px')

  //   //scaling for svg
  //   const xScale = d3.scaleBand()
  //   .domain(sample.map((val,i)=>i))
  //   .range([0, w])
  //   .padding(0.5)

  //   const yScale = d3.scaleLinear()
  //   .domain([0,h])
  //   .range([h, 0])

  //   //setting up axes
  //   const xAxis = d3.axisBottom(xScale)
  //   .ticks(sample.length)

  // },[sample])

  // const margin = 60;
  // const width = 1000 - 2 * margin;
  // const height = 600 - 2 * margin;

  // useEffect(() => {
  //   const margin = { top: 50, right: 30, bottom: 30, left: 60 };
  //   const chartWidth = width;
  //   const chartHeight = height;
  //   const svg = d3
  //     .select(d3Chart.current)
  //     .attr("width", chartWidth + margin.left + margin.right)
  //     .attr("height", chartHeight + margin.top + margin.bottom);

  //   const x = d3.scaleBand()
  // }, []);

  return (
    <div className="chart" id="chart">
      {data ? (
        <h1>Both are selected</h1>
      ) : (
        <h1>Please select both the year and goal</h1>
      )}
    </div>
  );
}
