import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const makeHeadArray = (stateHead) => {
  return [stateHead.url].concat(stateHead.tags);
};
const makeRowArray = (stateRow) => {
  return [stateRow.url].concat(stateRow.tagResult);
};

export default function DataServicePresenter({ stateHead, stateRows }) {
  const classes = useStyles();
  console.log(stateHead, stateRows);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {makeHeadArray(stateHead).map((e, idx) => {
              return <TableCell>{e}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {stateRows.map((row, idx) => {
            const array = makeRowArray(row);
            return (
              <TableRow key={row.url}>
                {array.map((e, idx) => (
                  <TableCell>{e}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
