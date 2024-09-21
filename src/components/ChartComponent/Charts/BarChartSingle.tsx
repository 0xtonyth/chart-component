import { useEffect, useState } from "react";

import {
  Bar,
  BarChart,
  // CartesianGrid,
  // ReferenceLine,
  ResponsiveContainer,
  // Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CurrentData, TimelineData } from "../../../types/ChartComponent";

type Props = {
  timelineData: TimelineData[];
  currentChartData: CurrentData;
};

const BarChartSingle = ({ currentChartData, timelineData }: Props) => {
  const [currentBarChartData, setCurrentBarChartData] =
    useState<CurrentData>(currentChartData);
  const [barChartData, setBarChartData] =
    useState<TimelineData[]>(timelineData);

  console.log("Bar Chart Data:", currentBarChartData);

  useEffect(() => {
    setCurrentBarChartData(currentChartData);
    setBarChartData(timelineData);
  }, [timelineData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={barChartData}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        {/* CartesianGrid for Vertical solid lines for day separation */}
        {/* <CartesianGrid
          vertical={true}
          horizontal={false}
          stroke="#E0E0E0"
          strokeDasharray="0"
        /> */}

        {/* X-Axis and Y-Axis */}
        <XAxis
          dataKey="name"
          tick={{ fill: "#8884D8", fontSize: 12, fontWeight: 600 }}
          tickLine={false}
          axisLine={{ stroke: "#D0D0D0" }}
          interval={0}
        />
        <YAxis
          tick={{ fill: "#8884D8", fontSize: 12, fontWeight: 600 }}
          tickLine={false}
          axisLine={{ stroke: "#D0D0D0" }}
          domain={["dataMin - 100", "dataMax + 1000"]}
        />

        {/* Tooltip to show minimal details */}
        {/* <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #8884d8",
            borderRadius: "8px",
            fontSize: "12px",
            color: "#000",
          }}
          itemStyle={{ color: "#8884d8" }}
        /> */}

        {/* Bar Chart for the data */}
        <Bar dataKey="pv" barSize={5} fill="#D3D3D3" />

        {/* Grey dotted Reference Lines for the average */}
        {/* <ReferenceLine
          y={currentBarChartData.average}
          strokeDasharray="3 3"
          stroke="#A0AEC0"
        />
        <ReferenceLine
          x={barChartData[Math.floor(barChartData.length / 2)].name!}
          strokeDasharray="3 3"
          stroke="#A0AEC0"
        /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartSingle;
