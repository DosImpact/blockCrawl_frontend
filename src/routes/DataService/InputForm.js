import React, { useState } from "react";
import * as R from "ramda";

import { makeStyles } from "@material-ui/core/styles";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  table: {
    minWidth: "100%",
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

export default function InputForm({ state, setState }) {
  const classes = useStyles();
  const { commonTags, tagCounter, urls, urlCounter } = state;

  const handleUpdateUrls = () => {};

  const handleAddTag = () => {
    setState((prev) => prev.setIn(["tagCounter"], tagCounter + 1));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>URLS들을 입력하세요</TableCell>
            <TableCell>
              <Button onClick={handleAddTag} className={classes.button}>
                태그 추가하기
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextareaAutosize
                rowsMax={100}
                aria-label="maximum height"
                placeholder="Maximum 4 rows"
                defaultValue="enter URLS"
              />
            </TableCell>
          </TableRow>

          {R.range(0, tagCounter).map((idx) => (
            <TableRow>
              <TableCell>
                <TextField label={`tag${idx}`}>Tag{idx}</TextField>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
