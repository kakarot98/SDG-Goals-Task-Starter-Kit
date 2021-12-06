import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useDispatch, useSelector } from "react-redux";
import { scaleQuantile } from "d3-scale";

//for some styling part
const COLOR_RANGE = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618"
];

const DEFAULT_COLOR = "#EEE";

const geographyStyle = {
  default: {
    outline: "none"
  },
  hover: {
    fill: "#ccc",
    transition: "all 250ms",
    outline: "none"
  },
  pressed: {
    outline: "none"
  }
};

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937]
};

const INDIA_TOPO_JSON = require("./india.topo.json");

export default function Map() {
  const chartDataValues = useSelector(
    (state) => state.chartData.chartDataValues
  );

  const [colorScale, setColorScale] = useState(null);

  useEffect(() => {
    if (chartDataValues) {
      setColorScale(() =>
        scaleQuantile()
          .domain(chartDataValues.map((d) => d.value))
          .range(COLOR_RANGE)
      );
    } else {
      setColorScale(() => {
        return null;
      });
    }
  }, [chartDataValues]);

  const [tooltipContent, setTooltipContent] = useState("");

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  return chartDataValues ? (
    <div>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={220}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = chartDataValues.find(
                (s) => s.area_name === geo.properties.name
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    current
                      ? colorScale
                        ? colorScale(current.value)
                        : DEFAULT_COLOR
                      : DEFAULT_COLOR
                  }
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  ) : (
    <div>No data selected yet</div>
  );
}
