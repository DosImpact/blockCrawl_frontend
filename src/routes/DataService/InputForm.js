import React, { useState, useEffect } from "react";

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

import { CSVLink } from "react-csv";

import { toast } from "react-toastify";

import { useFormik } from "formik";

const sampleData = `
https://movie.naver.com/movie/bi/mi/basic.nhn?code=189069"
https://movie.naver.com/movie/bi/mi/basic.nhn?code=182234
https://movie.naver.com/movie/bi/mi/basic.nhn?code=188909
https://movie.naver.com/movie/bi/mi/basic.nhn?code=178351
https://movie.naver.com/movie/bi/mi/basic.nhn?code=185917
https://movie.naver.com/movie/bi/mi/basic.nhn?code=134824
https://movie.naver.com/movie/bi/mi/basic.nhn?code=189618
https://movie.naver.com/movie/bi/mi/basic.nhn?code=52515
https://movie.naver.com/movie/bi/mi/basic.nhn?code=67457
https://movie.naver.com/movie/bi/mi/basic.nhn?code=192247
https://movie.naver.com/movie/bi/mi/basic.nhn?code=192066
https://movie.naver.com/movie/bi/mi/basic.nhn?code=194799
https://movie.naver.com/movie/bi/mi/basic.nhn?code=193066
https://movie.naver.com/movie/bi/mi/basic.nhn?code=185273
https://movie.naver.com/movie/bi/mi/basic.nhn?code=182809
https://movie.naver.com/movie/bi/mi/basic.nhn?code=163788
https://movie.naver.com/movie/bi/mi/basic.nhn?code=177608
https://movie.naver.com/movie/bi/mi/basic.nhn?code=187351
https://movie.naver.com/movie/bi/mi/basic.nhn?code=194693
https://movie.naver.com/movie/bi/mi/basic.nhn?code=185269
https://movie.naver.com/movie/bi/mi/basic.nhn?code=183429
https://movie.naver.com/movie/bi/mi/basic.nhn?code=190355
https://movie.naver.com/movie/bi/mi/basic.nhn?code=191143
https://movie.naver.com/movie/bi/mi/basic.nhn?code=106360
https://movie.naver.com/movie/bi/mi/basic.nhn?code=195180
https://movie.naver.com/movie/bi/mi/basic.nhn?code=186239
https://movie.naver.com/movie/bi/mi/basic.nhn?code=187294
https://movie.naver.com/movie/bi/mi/basic.nhn?code=174261
https://movie.naver.com/movie/bi/mi/basic.nhn?code=136872
https://movie.naver.com/movie/bi/mi/basic.nhn?code=168051
https://movie.naver.com/movie/bi/mi/basic.nhn?code=185282
https://movie.naver.com/movie/bi/mi/basic.nhn?code=185150
https://movie.naver.com/movie/bi/mi/basic.nhn?code=189633
https://movie.naver.com/movie/bi/mi/basic.nhn?code=29059
https://movie.naver.com/movie/bi/mi/basic.nhn?code=10001
https://movie.naver.com/movie/bi/mi/basic.nhn?code=179307
https://movie.naver.com/movie/bi/mi/basic.nhn?code=185285
https://movie.naver.com/movie/bi/mi/basic.nhn?code=191642
https://movie.naver.com/movie/bi/mi/basic.nhn?code=134963
https://movie.naver.com/movie/bi/mi/basic.nhn?code=85825
https://movie.naver.com/movie/bi/mi/basic.nhn?code=185256
https://movie.naver.com/movie/bi/mi/basic.nhn?code=189747
https://movie.naver.com/movie/bi/mi/basic.nhn?code=10480
https://movie.naver.com/movie/bi/mi/basic.nhn?code=136870
https://movie.naver.com/movie/bi/mi/basic.nhn?code=14448
https://movie.naver.com/movie/bi/mi/basic.nhn?code=189624
https://movie.naver.com/movie/bi/mi/basic.nhn?code=36651
https://movie.naver.com/movie/bi/mi/basic.nhn?code=173247
https://movie.naver.com/movie/bi/mi/basic.nhn?code=179397
https://movie.naver.com/movie/bi/mi/basic.nhn?code=186348
https://movie.naver.com/movie/bi/mi/basic.nhn?code=171518
https://movie.naver.com/movie/bi/mi/basic.nhn?code=159311
https://movie.naver.com/movie/bi/mi/basic.nhn?code=168050
https://movie.naver.com/movie/bi/mi/basic.nhn?code=194368
https://movie.naver.com/movie/bi/mi/basic.nhn?code=186235
https://movie.naver.com/movie/bi/mi/basic.nhn?code=181099
https://movie.naver.com/movie/bi/mi/basic.nhn?code=37742
https://movie.naver.com/movie/bi/mi/basic.nhn?code=185292
https://movie.naver.com/movie/bi/mi/basic.nhn?code=182387
https://movie.naver.com/movie/bi/mi/basic.nhn?code=79770
https://movie.naver.com/movie/bi/mi/basic.nhn?code=156912
https://movie.naver.com/movie/bi/mi/basic.nhn?code=56220
https://movie.naver.com/movie/bi/mi/basic.nhn?code=179414
https://movie.naver.com/movie/bi/mi/basic.nhn?code=27111
https://movie.naver.com/movie/bi/mi/basic.nhn?code=179394
https://movie.naver.com/movie/bi/mi/basic.nhn?code=40932
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    background: "linear-gradient(45deg, #a29bfe 30%,#a29bfe 60%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  buttonSucces: {
    background: "linear-gradient(45deg, #a29bfe 20%, #45fc60 100%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  buttonRed: {
    background: "linear-gradient(45deg, #a29bfe 20%, #fc4545 100%)",
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

export default function InputForm({
  state,
  setState,
  handleResetData,
  startCompile,
  _handleDataToArray,
}) {
  const classes = useStyles();
  const { tagCounter, urlCounter } = state;

  const [csvData, csvDataSet] = useState(null);
  const [urlsText, setUrlsText] = useState(sampleData);
  const initialValues = state.commonTags.reduce((store, tag, idx) => {
    store[`tag${idx}`] = tag;
    return store;
  }, {});
  const formik = useFormik({
    initialValues,
    onSubmit: (data) => {
      console.log(data);
      setState((prev) => prev.setIn(["commonTags"], Object.values(data)));
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
  const handleReset = () => {
    toast.dark("리셋 완료.");
    handleResetData();
  };
  const handleStartTest = () => {
    toast.dark("데이터 수집을 시작합니다.");
    startCompile();
  };

  const handleCSVOutput = () => {
    toast.dark("엑셀로 변환합니다.");
    const result = _handleDataToArray();
    csvDataSet(result);
  };

  const handleUpdateUrls = () => {
    let urlsSplited = urlsText.split("\n");
    const pattern = /\b(?:https?):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*/im;
    urlsSplited = urlsSplited.filter((e) => pattern.test(e));
    setState((prev) =>
      prev.set("urlCounter", urlsSplited.length).set("urls", urlsSplited)
    );
  };

  const handleAddTagCounter = () => {
    setState((prev) =>
      prev
        .updateIn(["tagCounter"], (tagCounter) => tagCounter + 1)
        .updateIn(["commonTags"], (arrs) => arrs.push(""))
    );
  };
  const handleUpdateTags = () => {
    toast.dark("태그 업데이트 완료");
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
                  style={{ marginLeft: "20px" }}
                  onClick={handleReset}
                  className={classes.button}
                >
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

              <TagsInput classes={classes} formik={formik} />
              <TableRow>
                <TableCell>
                  <Button
                    onClick={handleAddTagCounter}
                    className={classes.button}
                  >
                    태그 추가하기
                  </Button>
                  <Button
                    style={{ marginLeft: "20px" }}
                    onClick={handleUpdateTags}
                    type="submit"
                    className={classes.button}
                  >
                    태그 적용하기
                  </Button>
                  <Button
                    style={{ marginLeft: "20px" }}
                    onClick={handleStartTest}
                    className={classes.buttonSucces}
                  >
                    테스트 하기
                  </Button>
                  <Button
                    style={{ marginLeft: "20px" }}
                    onClick={handleCSVOutput}
                    className={classes.buttonSucces}
                  >
                    엑셀로 저장
                  </Button>
                  {csvData && (
                    <Button
                      style={{ marginLeft: "20px" }}
                      onClick={handleCSVOutput}
                      className={classes.buttonRed}
                    >
                      <CSVLink
                        data={csvData}
                        filename={"my-file.csv"}
                        className="btn btn-primary"
                        target="_blank"
                      >
                        Download me
                      </CSVLink>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </form>
      {/* <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div> */}
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
