import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setChart } from "../redux/ducks/chartData";
import OutlinedCard from "./card";

export default function Chart() {
  const dispatch = useDispatch();
  const d3Chart = useRef();

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
                      .value
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

  const drawChart = (data) => {
    
    d3.select(d3Chart.current).selectAll("svg").remove();

    const margin = { top: 50, right: 20, bottom: 30, left: 40 };

    const chartWidth =
      parseInt(d3.select("#chart").style("width")) - margin.left - margin.right;

    const chartHeight =
      parseInt(d3.select("#chart").style("height")) -
      margin.top -
      margin.bottom;

    const svg = d3
      .select(d3Chart.current)
      .attr("id", "drawnChart")
      .append("svg")
      .attr("width", chartWidth + margin.left + margin.right)
      .attr("height", chartHeight + margin.top + margin.bottom)
      .style("border", "1px solid black")
      .style("overflow", "visible");

    var selection = svg.selectAll("rect").data(data);

    //scaling for svg
    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, chartWidth - margin.right])
      .padding(0.3);

    const maxValue = d3.max(data, function (v) {
      return v.value;
    });

    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([chartHeight, margin.top]);

    selection
      .enter()
      .append("g")
      .attr("transform", "translate(0," + chartHeight + ")")
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat((i) => data[i].area_name)
          .ticks(5)
          .tickPadding(2)
          .tickSizeOuter(2)
      )
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    selection
      .enter()
      .append("g")
      .attr("transform", "translate(" + margin.left + ", 0)")
      .call(d3.axisLeft(yScale));

    selection
      .enter()
      .append("g")
      .attr("fill", "royalblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .transition()
      .duration(300)
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => yScale(0) - yScale(d.value))
      .attr("width", xScale.bandwidth());

    selection.exit().remove();
  }

  useEffect(() => {
    if (chartDataValues) {
      drawChart(chartDataValues)
      
    }
  }, [chartDataValues]);

  
  return (
    <div className="chart" id="chart">
      {chartDataValues ? (
        <div ref={d3Chart}></div>
      ) : (
        <OutlinedCard />
      )}
    </div>
  );
}
