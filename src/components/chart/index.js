import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setChart } from "../redux/ducks/chartData";
import OutlinedCard from "./card";
import Filters from "./filters";

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
  const [dataToDisplay, setDataToDisplay] = useState(null);
  const [filter, setFilter] = useState("STATE");

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

  const drawChart = (data) => {
    d3.select(d3Chart.current).selectAll("svg").remove();

    const margin = { top: 50, right: 20, bottom: 30, left: 40 };

    const chartWidth = 1000;
    const chartHeight = 600;

    const svg = d3
      .select(d3Chart.current)
      .attr("id", "drawnChart")
      .append("svg")
      .attr("width", chartWidth + margin.left + margin.right)
      .attr("height", chartHeight + margin.top + margin.bottom)
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
      .transition()
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
      .transition()
      .call(d3.axisLeft(yScale));

    selection
      .enter()
      .append("g")
      .attr("fill", () => {
        return filter == "STATE" ? "royalblue" : "purple";
      })
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
  };

  useEffect(() => {
    if (chartDataValues && dataToDisplay) {
      drawChart(dataToDisplay);
    }
  }, [dataToDisplay]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginTop: "25px",
      }}
      className="chart"
      id="chart"
    >
      <div>
        <Filters
          filter={filter}
          setFilter={setFilter}
          chartDataValues={chartDataValues}
          dataToDisplay={dataToDisplay}
          setDataToDisplay={setDataToDisplay}
        />
      </div>
      {chartDataValues && dataToDisplay ? (
        <div ref={d3Chart} style={{ height: "100%", width: "100%" }}></div>
      ) : (
        <OutlinedCard />
      )}
    </div>
  );
}
