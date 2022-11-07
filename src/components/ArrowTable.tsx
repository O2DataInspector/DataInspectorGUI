import React from "react";

import { Message } from "store/state";
import { Typography } from "@mui/material";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";

interface ArrowTableProps {
  message: Message;
}

interface Row {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [column: string]: any;
}

interface SerializedTable {
  rows: Row[];
}

const ArrowTable = ({ message }: ArrowTableProps) => {
  const rows = message.payload as SerializedTable;
  const columns = getColumns(rows);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableCell key={c} align="center">
                {c}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.rows.map((row: Row, index: number) => buildRow(row, index))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function getColumns(table: SerializedTable) {
  if (table.rows.length > 0) {
    return Object.keys(table.rows[0]);
  }
  return [] as string[];
}

function buildRow(row: Row, index: number) {
  return (
    <TableRow
      key={index}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {Object.keys(row).map((k) => (
        <TableCell key={k + index} align="right">
          {row[k]}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default ArrowTable;
