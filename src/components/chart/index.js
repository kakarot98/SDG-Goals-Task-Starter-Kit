import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setChart } from "../redux/ducks/chartData";

export default function Chart() {
  const dispatch = useDispatch();
  const d3Chart = useRef();
  //const [data, setData] = useState();

  //can get multiple state values with useselector but component will re-render everytime a part of state changes
  // const [year, goal] = useSelector((state) => [
  //   state.chartData.year,
  //   state.chartData.goal,
  // ]);
  const year = useSelector((state) => state.chartData.year);
  const goal = useSelector((state) => state.chartData.goal);
  const chartDataValues = useSelector(
    (state) => state.chartData.chartDataValues
  );

  useEffect(() => {
    if (year && goal) {
      const fetchData = async (year) => {
        await axios
          .get(`${year}.json`)
          .then((res) => {
            // const tempArrayOfObjects = res.data.map((e,i) => {return {area_name: e.area_name, value:(e.chartdata.filter(obj => obj.name === goal)[0].value)}})
            dispatch(
              setChart(
                res.data.map((e, i) => {
                  return {
                    area_name: e.area_name,
                    value: e.chartdata.filter((obj) => obj.name === goal)[0]
                      .value,
                  };
                })
              )
            );
          })
          .catch((err) => console.log(err));
      };
      fetchData(year);
    }
  }, [year, goal, dispatch]);

  useEffect(() => {
    if (chartDataValues) {
      //container for svg
      const margin = { top: 50, right: 30, bottom: 30, left: 60 };
      const chartWidth =
        parseInt(d3.select("#chart").style("width")) -
        margin.left -
        margin.right;
      const chartHeight =
        parseInt(d3.select("#chart").style("height")) -
        margin.top -
        margin.bottom;
      const svg = d3
        .select(d3Chart.current)
        .attr("width", chartWidth + margin.left + margin.right)
        .attr("height", chartHeight + margin.top + margin.bottom)
        .style("overflow", "visible");

      //scaling for svg
      const xScale = d3
        .scaleBand()
        .domain(d3.range(chartDataValues.length))
        .range([margin.left, chartWidth - margin.right])
        .padding(0.5);

      svg
        .append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(
          d3
            .axisBottom(xScale)
            .tickFormat((i) => chartDataValues[i].area_name)
            .tickSizeOuter(0)
        );

      const maxValue = d3.max(chartDataValues, function (v) {
        return v.value;
      });

      const yScale = d3
        .scaleLinear()
        .domain([0, maxValue])
        .range([chartHeight, margin.top]);

      svg
        .append("g")
        .attr("transform", "translate(" + margin.left + ", 0)")
        .call(d3.axisLeft(yScale));

      svg
        .append("g")
        .attr("fill", "royalblue")
        .selectAll("rect")
        .data(chartDataValues)
        .join("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", (d) => yScale(d.value))
        .attr("height", (d) => yScale(0) - yScale(d.value))
        .attr("width", xScale.bandwidth());
      //setting up axes
      // const xAxis = d3.axisBottom(xScale)
      // .ticks(sample.length)
    }
  }, [chartDataValues]);

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
      {chartDataValues ? (
        <svg ref={d3Chart}></svg>
      ) : (
        <h1>Please select both the year and goal</h1>
      )}
    </div>
  );
}
