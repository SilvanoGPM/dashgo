import Head from 'next/head';
import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },

  grid: {
    show: false,
  },

  dataLabels: {
    enabled: false,
  },

  tooltip: {
    enabled: false,
  },

  xaxis: {
    type: 'datetime' as const,
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2022-06-12T00:00:00.000Z',
      '2022-06-13T00:00:00.000Z',
      '2022-06-14T00:00:00.000Z',
      '2022-06-15T00:00:00.000Z',
      '2022-06-16T00:00:00.000Z',
      '2022-06-17T00:00:00.000Z',
      '2022-06-18T00:00:00.000Z',
    ],
  },

  fill: {
    colors: [theme.colors.pink[500]],
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  stroke: { colors: [theme.colors.pink[500]] },
};

const series = [{ name: 'series1', data: [40, 52, 123, 12, 58, 92, 31] }];

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashbord - DashGO</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" mx="auto" px="6" maxWidth={1480}>
          <Sidebar />

          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            alignItems="flex-start"
          >
            <Box
              p={['6', '8']}
              pb="4"
              borderRadius={8}
              _dark={{ bg: 'gray.800' }}
              _light={{ bg: 'gray.100' }}
            >
              <Text fontSize="large" mb="4">
                Inscritos da semana
              </Text>

              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Box>

            <Box
              p={['6', '8']}
              pb="4"
              borderRadius={8}
              _dark={{ bg: 'gray.800' }}
              _light={{ bg: 'gray.100' }}
            >
              <Text fontSize="large" mb="4">
                Taxa de abertura
              </Text>
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}
