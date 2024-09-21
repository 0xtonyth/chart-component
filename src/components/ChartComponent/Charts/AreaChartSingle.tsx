import { useEffect, useState } from "react";

import {
  AreaChart,
  Area,
  CartesianGrid,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CurrentData, TimelineData } from "../../../types/ChartComponent";

type Props = {
  timelineData: TimelineData[];
  currentChartData: CurrentData;
};

const AreaChartSingle = ({ currentChartData, timelineData }: Props) => {
  const [currentAreaChartData, setCurrentAreaChartData] =
    useState<CurrentData>(currentChartData);
  const [areaChartData, setAreaChartData] =
    useState<TimelineData[]>(timelineData);

  console.log("Area Chart Data:", currentAreaChartData);

  useEffect(() => {
    setCurrentAreaChartData(currentChartData);
    setAreaChartData(timelineData);
  }, [timelineData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={areaChartData}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        {/* Gradient for the Area */}
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4B40EE" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#4B40EE" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* CartesianGrid for Vertical solid lines for day separation */}
        <CartesianGrid
          vertical={true}
          horizontal={false}
          stroke="#E0E0E0"
          strokeDasharray="0"
        />

        {/* X-Axis and Y-Axis */}
        <XAxis
          dataKey="name"
          tick={{ fill: "#8884D8", fontSize: 12, fontWeight: 600 }}
          tickLine={false}
          axisLine={{ stroke: "#D0D0D0" }}
          interval={3}
        />
        <YAxis
          tick={{ fill: "#8884D8", fontSize: 12, fontWeight: 600 }}
          tickLine={false}
          axisLine={{ stroke: "#D0D0D0" }}
          domain={["dataMin - 500", "dataMax + 500"]}
        />

        {/* Tooltip to show minimal details */}
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #8884d8",
            borderRadius: "8px",
            fontSize: "12px",
            color: "#000",
          }}
          itemStyle={{ color: "#8884d8" }}
        />

        {/* Area with gradient fill */}
        <Area
          type="linear"
          dataKey="uv"
          stroke="#4B40EE"
          fill="url(#colorUv)"
          fillOpacity={1}
        />

        {/* Line on top for bold effect */}
        <Line
          type="linear"
          dataKey="uv"
          stroke="#4B40EE"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 8 }}
        />

        {/* Grey dotted Reference Lines for the average */}
        <ReferenceLine
          y={currentAreaChartData.average}
          strokeDasharray="3 3"
          stroke="#A0AEC0"
        />
        <ReferenceLine
          x={areaChartData[Math.floor(areaChartData.length / 2)].name!}
          strokeDasharray="3 3"
          stroke="#A0AEC0"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartSingle;
