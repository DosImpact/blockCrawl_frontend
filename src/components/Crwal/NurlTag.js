import React, { useState } from "react";
import useInput from "../../hooks/useInput";
/**
 * 사용자가 url를 TextArea에 붙여넣고 , 개행별로 구분을 해서 파싱을 해보자.
 */

import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import Loader from "../Loader";

const N_URL_TAG = gql`
  query NurlTagQuery($tag: String!, $urls: [String!]!) {
    NurlTag(tag: $tag, urls: $urls)
  }
`;

export default () => {
  const [getNurlTag, { loading, data }] = useLazyQuery(N_URL_TAG);
  const urlsInput = useInput();
  const tagInput = useInput();
  const submitBtn = async () => {
    console.log("submit");
    let urls = null;
    let tag = null;
    if (urlsInput.value) {
      urls = String(urlsInput.value).trim().split("\n");
      console.log(urls);
    }
    if (tagInput.value) {
      tag = String(tagInput.value);
    }
    console.log(urls);
    console.log(tag);
    getNurlTag({ variables: { tag, urls } });
  };
  return (
    <>
      <h1>NurlTag Components</h1>
      <h2>urls</h2>
      <textarea {...urlsInput}></textarea>
      <h2>tags</h2>
      <input type="text" {...tagInput}></input>
      {loading && <Loader />}
      {data && JSON.stringify(data)}
      <button onClick={submitBtn}>OK</button>
    </>
  );
};
