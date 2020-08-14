import React, { useState, useEffect } from "react";
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

import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
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
  tagTextField: {
    minWidth: "100%",
  },
}));

export default function InputForm({ state, setState }) {
  const classes = useStyles();
  const { commonTags, tagCounter, urls, urlCounter } = state;

  const [urlsText, setUrlsText] = useState(
    "https://movie.naver.com/movie/bi/mi/basic.nhn?code=182234\nhttps://movie.naver.com/movie/bi/mi/basic.nhn?code=188909"
  );
  const [initialValues, setInitialValues] = useState(
    state.commonTags.reduce((store, tag, idx) => {
      store[`tag${idx}`] = tag;
      return store;
    }, {})
  );
  console.log("initialValues", initialValues);
  const formik = useFormik({
    initialValues,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    formik.setValues(
      state.commonTags.reduce((store, tag, idx) => {
        store[`tag${idx}`] = tag;
        return store;
      }, {})
    );
    return () => {};
  }, [state]);

  const handleUrlsTextChange = (e) => {
    setUrlsText(e.target.value);
    handleUpdateUrls();
  };
  const handleReset = () => {};
  const handleSubmit = () => {};

  const handleUpdateUrls = () => {
    let urlsSplited = urlsText.split("\n");
    const pattern = /\b(?:https?):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*/im;
    urlsSplited = urlsSplited.filter((e) => pattern.test(e));
    setState((prev) =>
      prev.set("urlCounter", urlsSplited.length).set("urls", urlsSplited)
    );
  };

  const handleAddTagCounter = () => {
    console.log("추가");
    setState((prev) =>
      prev
        .updateIn(["tagCounter"], (tagCounter) => tagCounter + 1)
        .updateIn(["commonTags"], (arrs) => arrs.push(""))
    );
  };
  const handleUpdateTags = () => {
    // const nodes = document.querySelectorAll("tagTextField");
    // console.log(nodes);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <div>URLS 태그 수집기</div>
              </TableCell>
              <TableCell>현재 urls 수 :{urlCounter}</TableCell>
              <TableCell>현재 tags 수 :{tagCounter}</TableCell>
              <TableCell>
                <Button
                  onClick={handleAddTagCounter}
                  className={classes.button}
                >
                  태그 추가하기
                </Button>
              </TableCell>

              <TableCell>
                <Button onClick={handleUpdateTags} className={classes.button}>
                  태그 적용하기
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={handleSubmit} className={classes.button}>
                  테스트 하기
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={handleReset} className={classes.button}>
                  초기화 하기
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <form onSubmit={formik.handleSubmit}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextareaAutosize
                    rowsMax={100}
                    style={{ width: "100%" }}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    value={urlsText}
                    onChange={handleUrlsTextChange}
                  />
                </TableCell>
              </TableRow>
              {/* {R.range(0, tagCounter).map((e, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell>
                      <TextField
                        onChange={formik.handleChange}
                        value={e[1]}
                        className={classes.tagTextField}
                        label={e[0]}
                        id={e[0]}
                      >
                        Tag{idx}
                      </TextField>
                    </TableCell>
                  </TableRow>
                );
              })} */}

              <TagsInput classes={classes} formik={formik} />
              <TableRow>
                <TableCell>
                  <button type="submit">제출</button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </form>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </>
  );
}

const TagsInput = ({ formik, classes }) => {
  return (
    <>
      {Object.entries(formik.values).map((e, idx) => {
        return (
          <TableRow key={idx}>
            <TableCell>
              <TextField
                onChange={formik.handleChange}
                value={e[1]}
                className={classes.tagTextField}
                label={e[0]}
                id={e[0]}
              >
                Tag{idx}
              </TextField>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
