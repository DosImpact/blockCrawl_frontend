# BlockCrwal/FrontEnd

# TODO = LIST

- one url | one selector 컴포넌트 개발 | 단순 주소 입력 > 단순 셀럭터 하나 입력
- N url | one selector
- N url | one selector, next one
- N url | one selector, 하위 one
- N url | img
- N url | pdf
- N url | N selector
- N url | N selector > xlsx

# Design Ref

- https://dribbble.com/shots/7699472-GitBets-Betting-Platform/attachments/428533?mode=media
- https://dribbble.com/shots/7699472-GitBets-Betting-Platform/attachments/428534?mode=media
- https://dribbble.com/shots/7699472-GitBets-Betting-Platform/attachments/428535?mode=media

# package

```
npm install react-router-dom axios
npm install styled-components styled-reset

yarn add @apollo/react-hooks
yarn add apollo-boost
yarn add graphql
yarn add graphql-tag
```

# Basic REST API

```js
import React, { useEffect, useState } from "react";
import { CrwalingApi } from "../../api";
import Loader from "../Loader";

export default () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchDataAPI = async () => {
      try {
        const { data } = await CrwalingApi.naverDust();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAPI();

    return () => {};
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <h1>NAVER CRWALING</h1>
        <h2>{data.result}</h2>
        <h2>{data.data}</h2>
      </>
    );
  }
};
```

# Basic Graph API

```js
import React from "react";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../Loader";

const NaverDust = gql`
  query NaverDustQuery {
    naverDust
  }
`;

export default () => {
  const { loading, error, data } = useQuery(NaverDust);
  return (
    <div>
      <h2>NaverDust Test</h2>
      {loading ? <Loader /> : <div> {JSON.stringify(data)} </div>}
    </div>
  );
};
```
