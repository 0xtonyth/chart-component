import { useEffect, useState } from "react";

import {
  Box,
  Text,
  Heading,
  Stat,
  StatHelpText,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

import { CurrentData } from "@/types/ChartComponent";

type Props = {
  currentData: CurrentData;
};

const StatsOverview = ({ currentData }: Props) => {
  const [data, setData] = useState<CurrentData>(currentData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setData(currentData);
    setIsLoading(false);
  }, [currentData]);

  return (
    <>
      {isLoading ? (
        <Stack mb={10}>
          <Skeleton width="200px" height="40px" />
          <Skeleton width="130px" height="20px" />
        </Stack>
      ) : (
        <Box textAlign="left" mb={8}>
          <Box display={"flex"}>
            <Heading as="h3" size="xl">
              {data.revenue.toLocaleString()}{" "}
            </Heading>
            <Text
              as="sup"
              mt={6}
              fontSize="md"
              fontWeight={500}
              color="gray.400"
            >
              USD
            </Text>
          </Box>
          <Stat mt={2}>
            <StatHelpText fontSize="md" color="green.400">
              +{data.increment.toLocaleString()} ({data.incrementPercent}%)
            </StatHelpText>
          </Stat>
        </Box>
      )}
    </>
  );
};

export default StatsOverview;
