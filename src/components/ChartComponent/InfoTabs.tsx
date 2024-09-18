import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";

import Chart from "./Chart";

import { ChartData } from "../../types/ChartComponent";

type Props = {
  chartData: ChartData;
  toggleFullscreen: () => void;
};

const InfoTabs = ({ chartData, toggleFullscreen }: Props) => {
  return (
    <Tabs /* isFitted */ defaultIndex={1}>
      <TabList>
        <Tab fontSize={"14px"} fontWeight={500} color={"#4B40EE"}>
          <Text textColor={"#404040"}>Summary</Text>
        </Tab>
        <Tab fontSize={"14px"} fontWeight={500} color={"#4B40EE"}>
          <Text textColor={"#404040"}>Chart</Text>
        </Tab>
        <Tab fontSize={"14px"} fontWeight={500} color={"#4B40EE"}>
          <Text textColor={"#404040"}>Statistics</Text>
        </Tab>
        <Tab fontSize={"14px"} fontWeight={500} color={"#4B40EE"}>
          <Text textColor={"#404040"}>Analysis</Text>
        </Tab>
        <Tab fontSize={"14px"} fontWeight={500} color={"#4B40EE"}>
          <Text textColor={"#404040"}>Settings</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Summary coming soon!</TabPanel>
        <TabPanel>
          <Chart chartData={chartData} toggleFullscreen={toggleFullscreen} />
        </TabPanel>
        <TabPanel>Statistics coming soon!</TabPanel>
        <TabPanel>Analysis coming soon!</TabPanel>
        <TabPanel>Settings coming soon!</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default InfoTabs;
