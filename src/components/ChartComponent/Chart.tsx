import { useEffect, useRef, useState } from "react";

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

import BarChartSingle from "./Charts/BarChartSingle";
import AreaChartSingle from "./Charts/AreaChartSingle";

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
    <Box w={"100%"} className={"custom-chart-container"}>
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
              size={"sm"}
              variant={"ghost"}
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
                size={"sm"}
                variant={"ghost"}
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
        <Box mr={"48px"}>
          <Flex direction={"row"}>
            <ButtonGroup size={"sm"} variant={"ghost"} spacing={0}>
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
          <Spinner mt={"120px"} size={"lg"} color={"#4B40EE"} />
        </Center>
      ) : (
        <Box
          w={"100%"}
          h={"100%"}
          ml={"-60px"}
          className={"custom-chart-container"}
        >
          <Box w={"100%"} h={"300px"}>
            <BarChartSingle
              currentChartData={data.currentChartData}
              timelineData={timelineData}
            />
          </Box>
          <Box w={"100%"} h={"300px"} mt={"-300px"}>
            <AreaChartSingle
              currentChartData={data.currentChartData}
              timelineData={timelineData}
            />
          </Box>

          {/* Benchmark Value Card */}
          <Box
            minW={"75px"}
            position={"absolute"}
            top={{ base: "230px", md: "185px" }}
            // top={`${averageValuePosition}px`}
            right={"20px"}
            bg={"gray.800"}
            color={"white"}
            px={2}
            py={1}
            borderRadius={"md"}
            fontSize={"sm"}
            textAlign={"center"}
          >
            {data.currentChartData.average.toLocaleString()}
          </Box>

          {/* Last Value Card */}
          <Box
            minW={"75px"}
            position={"absolute"}
            top={{ base: "365px", md: "325px" }}
            // top={`${lastValuePosition}px`}
            right={"20px"}
            bg={"#4B40EE"}
            color={"white"}
            px={2}
            py={1}
            borderRadius={"md"}
            fontSize={"sm"}
            textAlign={"center"}
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
            <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
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
