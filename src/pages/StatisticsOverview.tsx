import React from "react";
import Plot from "react-plotly.js";

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
import {useParams} from "react-router-dom";

export interface StatisticsResponse {
  x: number[];
  yNumbers: number[];
  yData: number[];
  totalMessages: number;
  totalData: number;
  minMsgSize: number;
  avgMsgSize: number;
  maxMsgSize: number;
  minDuration: number;
  avgDuration: number;
  maxDuration: number;
  minStartTime: number;
  maxStartTime: number;
  minCreationTime: number;
  maxCreationTime: number;
}

interface RunIdParam {
  runId: string
}

const StatisticsOverview = () => {
  const [statsData, setStatsData] = React.useState<
    StatisticsResponse | undefined
  >();
  const params = useParams<RunIdParam>();

  return (
    <Stack direction="column">
      <NavigationBar>
        <Buttons.Disconnect />
        <Buttons.SelectDevices runId={params.runId} />
        <Buttons.StopRun runId={params.runId} />
        <Buttons.SelectRun />
      </NavigationBar>
      <Container sx={{ flex: 1 }}>
        <MenuTabs runId={params.runId} />
        <StatisticsForm statsData={statsData} setStatsData={setStatsData} runId={params.runId} />
        {(statsData && statsData.x.length > 0) && <TimeSeriesPlot statsData={statsData} />}
        {statsData && <SummaryTable statsData={statsData} />}
      </Container>
    </Stack>
  );
};

interface StatisticsProps {
  statsData: StatisticsResponse;
}

const TimeSeriesPlot = ({ statsData }: StatisticsProps) => {
  return (
    <Paper sx={{ width: "80%", mx: "auto" }}>
      <Container sx={{ width: "80%", mx: "auto" , height: "80%"}}>
          <Plot
            data={[{ type: "bar", x: statsData.x, y: statsData.yNumbers}]}
            layout={{}}
            config={{ responsive: true }}
          /> 
          <Plot
          data={[{ type: "bar", x: statsData.x, y: statsData.yData}]}
          layout={{}}
          config={{ responsive: true }}
        />
      </Container>
    </Paper>
  );
};

const SummaryTable = ({ statsData }: StatisticsProps) => {
  return (
    <Paper sx={{ width: "80%", mx: "auto", my: "5%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell />
            <TableCell align="right">Total</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Messages</TableCell>
              <TableCell align="right">{statsData.totalMessages}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell align="right">{statsData.totalData} B</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Min.</TableCell>
              <TableCell align="right">Avg.</TableCell>
              <TableCell align="right">Max</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Message size</TableCell>
              <TableCell align="right">{statsData.minMsgSize} B</TableCell>
              <TableCell align="right">{statsData.avgMsgSize} B</TableCell>
              <TableCell align="right">{statsData.maxMsgSize} B</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Duration</TableCell>
              <TableCell align="right">{statsData.minDuration}</TableCell>
              <TableCell align="right">{statsData.avgDuration}</TableCell>
              <TableCell align="right">{statsData.maxDuration}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Oldest</TableCell>
              <TableCell align="right">Newest</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Start time</TableCell>
              <TableCell align="right">{statsData.minStartTime}</TableCell>
              <TableCell align="right">{statsData.maxStartTime}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Creation time</TableCell>
              <TableCell align="right">{statsData.minCreationTime}</TableCell>
              <TableCell align="right">{statsData.maxCreationTime}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default StatisticsOverview;
