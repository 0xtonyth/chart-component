type ChartData = {
  currentChartData: CurrentData;
  data1d?: [];
  data3d?: [];
  data1w: TimelineData[];
  data1m?: [];
  data6m?: [];
  data1y?: [];
  datamax?: [];
};

type CurrentData = {
  revenue: number;
  average: number;
  increment: number;
  incrementPercent: number;
};

type TimelineData = {
  name: string;
  uv: number;
};

export type { ChartData, CurrentData, TimelineData };
