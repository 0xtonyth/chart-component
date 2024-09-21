import { useEffect, useState, useRef } from "react";

import axios from "axios";

import { Box } from "@chakra-ui/react";

import StatsOverview from "@/components/ChartComponent/StatsOverview";
import InfoTabs from "@/components/ChartComponent/InfoTabs";

import { ChartData } from "@/types/ChartComponent";

const initialData = {
  currentChartData: {
    revenue: 0,
    average: 0,
    increment: 0,
    incrementPercent: 0,
  },
  data1w: [{ name: "", uv: 0 }],
};

const ChartComponent = () => {
  const [chartData, setChartData] = useState<ChartData>(initialData);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement | null>(null);

  const fetchChartData = async () => {
    try {
      const response = await axios.get("/data/db.json");

      setChartData(response.data);

      /* if (response.status === 200) {
        const chartDataResponse = await response.data;
        setChartData(chartDataResponse);
      } else {
        console.log(`Error ${response.status}`);
      } */
    } catch (error: any) {
      console.error("Error fetching chart data:", error.message);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (chartRef.current) {
        chartRef.current.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen mode:", err);
        });
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          console.error("Error attempting to exit fullscreen mode:", err);
        });
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    fetchChartData();

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <>
      <Box
        p={5}
        mt={10}
        borderWidth={1}
        borderRadius={"10px"}
        boxShadow={"10px"}
        width={{ base: "480px", md: "680px" }}
        maxHeight={"100%"}
        h={isFullscreen ? "100vh" : { base: "585px", md: "535px" }}
        ref={chartRef}
        bg={isFullscreen ? "white" : "transparent"}
        transition="background-color 0.8s ease"
      >
        <StatsOverview currentData={chartData.currentChartData} />
        <InfoTabs chartData={chartData} toggleFullscreen={toggleFullscreen} />
      </Box>
    </>
  );
};

export default ChartComponent;
