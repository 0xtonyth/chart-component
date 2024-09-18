import { useEffect, useRef, useState } from "react";

import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Spacer,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";

import { ChartData, TimelineData } from "../../types/ChartComponent";

import "../../styles/ChartComponent/Chart.css";

type Props = {
  chartData: ChartData;
  toggleFullscreen: () => void;
};

const Chart = ({ chartData, toggleFullscreen }: Props) => {
  const timeFrames = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

  const [data, setData] = useState<ChartData>(chartData);
  const [timeline, setTimeline] = useState<string>("1w");
  const [timelineData, setTimelineData] = useState<TimelineData[]>(data.data1w);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLDivElement | null>(null);

  const changeTimeline = (newTimeline: string) => {
    if (newTimeline === "1d") {
      setTimelineData(data.data1d!);
    } else if (newTimeline === "3d") {
      setTimelineData(data.data3d!);
    } else if (newTimeline === "1w") {
      setTimelineData(data.data1w);
    } else if (newTimeline === "1m") {
      setTimelineData(data.data1m!);
    } else if (newTimeline === "6m") {
      setTimelineData(data.data6m!);
    } else if (newTimeline === "1y") {
      setTimelineData(data.data1y!);
    } else {
      setTimelineData(data.data1y!);
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    setData(chartData);
    setTimelineData(chartData.data1w);
    setIsLoading(false);
  }, [chartData]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <Box w="100%" className="custom-chart-container">
      <Box
        mt={5}
        mb={4}
        display={"flex"}
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: 2, md: "none" }}
      >
        {/* Fullscreen and Compare buttons */}
        <Box ml={-3}>
          <Flex direction={"row"}>
            <Button
              leftIcon={
                isFullscreen ? <BsFullscreenExit /> : <BsArrowsFullscreen />
              }
              size="sm"
              variant="ghost"
              fontSize={"12px"}
              isActive={isFullscreen}
              onClick={() => {
                toggleFullscreen(), setIsFullscreen(!isFullscreen);
              }}
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
            {!isFullscreen ? (
              <Button
                leftIcon={<FiPlusCircle />}
                size="sm"
                variant="ghost"
                fontSize={"12px"}
                isActive={isOpen}
                onClick={onOpen}
              >
                Compare
              </Button>
            ) : null}
          </Flex>
        </Box>
        <Spacer />

        {/* Timeline selector buttons */}
        <Box mr={"50px"}>
          <Flex direction={"row"}>
            <ButtonGroup size="sm" /* isAttached */ variant="ghost" spacing={0}>
              {timeFrames.map((frame: string, index: number) => {
                return (
                  <Button
                    key={index}
                    onClick={() => {
                      setTimeline(frame), changeTimeline(frame);
                    }}
                    isActive={timeline === frame}
                    fontSize={"12px"}
                  >
                    {frame}
                  </Button>
                );
              })}
            </ButtonGroup>
          </Flex>
        </Box>
      </Box>
      {isLoading ? (
        <Center>
          <Spinner mt={"120px"} size="lg" color={"#4B40EE"} />
        </Center>
      ) : (
        <Box ml={"-58px"} w="100%" h="300px" className="custom-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={timelineData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              {/* Gradient for the Area */}
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4B40EE" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4B40EE" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* CartesianGrid: Vertical solid lines for day separation */}
              <CartesianGrid
                vertical={true}
                horizontal={false}
                stroke="#E0E0E0"
                strokeDasharray="0"
              />

              {/* X-Axis and Y-Axis */}
              <XAxis
                dataKey="name"
                tick={{ fill: "#8884d8", fontSize: 12, fontWeight: 600 }}
                tickLine={false}
                axisLine={{ stroke: "#D0D0D0" }}
                interval={0}
              />
              <YAxis
                tick={{ fill: "#8884d8", fontSize: 12, fontWeight: 600 }}
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
                y={data.currentChartData.average}
                strokeDasharray="3 3"
                stroke="#A0AEC0"
              />
              <ReferenceLine
                x={timelineData[Math.floor(timelineData.length / 2)].name!}
                strokeDasharray="3 3"
                stroke="#A0AEC0"
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Benchmark Value Card */}
          <Box
            minW={"75px"}
            position="absolute"
            top={{ base: "205px", md: "160px" }}
            right="20px"
            bg="gray.800"
            color="white"
            px={2}
            py={1}
            borderRadius="md"
            fontSize="sm"
            textAlign="center"
          >
            {data.currentChartData.average.toLocaleString()}
          </Box>

          {/* Last Value Card */}
          <Box
            minW={"75px"}
            position="absolute"
            top={{ base: "315px", md: "270px" }}
            right="20px"
            bg="#4B40EE"
            color="white"
            px={2}
            py={1}
            borderRadius="md"
            fontSize="sm"
            textAlign="center"
          >
            {timelineData[timelineData.length - 1].uv.toLocaleString()}
          </Box>
        </Box>
      )}

      {/* Dialogue box for Compare button */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Compare
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>Coming soon!</AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Chart;
