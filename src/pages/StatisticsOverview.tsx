import React from "react";
import Plot from 'react-plotly.js';

import NavigationBar, * as Buttons from "components/NavigationBar";
import {
  Stack,
  Container,
  Box,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import MenuTabs from "components/MenuTabs";
import { StatisticsForm } from "components/StatisticsForm";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StatisticsData{
  

}

const StatisticsOverview = () => {
  const [statisticsData, setStatisticsData] = React.useState(
    undefined
  );

  return (
    <Stack direction="column">
      <NavigationBar>
        <Buttons.Disconnect />
        <Buttons.SelectDevices />
      </NavigationBar>
      <Container sx={{ flex: 1 }}>
        <MenuTabs />
        <StatisticsForm />
        <TimeSeriesPlot />
        <SummaryTable />
      </Container>
    </Stack>
  );
};

const TimeSeriesPlot = () => {
  return (
    <Paper sx={{width: "80%", mx: "auto" }}>
      <Container sx={{width: "80%", mx: "auto" }}>
            <Plot
      data={[
        {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
      ]}
      layout={ {title: 'A Fancy Plot'} }
      config ={{responsive: true}}
    />
      </Container>
    </Paper>
  );
}

const SummaryTable = () => {
  return (
    <Paper sx={{width: "80%", mx: "auto", my: "5%"}}>     
 <TableContainer>
      <Table>
        <TableHead>
          <TableCell/>
          <TableCell align="right">Total</TableCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Messages</TableCell>
            <TableCell align="right">1292</TableCell>
          </TableRow>
          <TableRow>
          <TableCell>Data</TableCell>
            <TableCell align="right">1292328 B</TableCell>
          </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
        <TableContainer>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell align="right">Min.</TableCell>
            <TableCell align="right">Avg.</TableCell>
            <TableCell align="right">Max</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Message size</TableCell>
            <TableCell align="right">328</TableCell>
            <TableCell align="right">458</TableCell>
            <TableCell align="right">528</TableCell>
          </TableRow>
          <TableRow>
          <TableCell>Duration</TableCell>
            <TableCell align="right">1</TableCell>
            <TableCell align="right">1.2</TableCell>
            <TableCell align="right">3</TableCell>
          </TableRow>
        </TableBody>
        </Table>
        </TableContainer>

        <TableContainer>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell align="right">Oldest</TableCell>
            <TableCell align="right">Newest</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Start time</TableCell>
            <TableCell align="right">328</TableCell>
            <TableCell align="right">458</TableCell>
          </TableRow>
          <TableRow>
          <TableCell>Creation time</TableCell>
            <TableCell align="right">1</TableCell>
            <TableCell align="right">1.2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}
export default StatisticsOverview;
