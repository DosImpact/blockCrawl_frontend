# BlockCrwal/FrontEnd

# Process

```
1. 백엔드 API -> 대응하는 프론트 로직 구현하기

2. 스토리 보드 및 디자인

```

# TODO = LIST

- one url | one selector 컴포넌트 개발 | 단순 주소 입력 > 단순 셀럭터 하나 입력
- N url | one selector
- eg) TDD1 : 네이버 영화 사이트 url 여러개 입력하고, 특정 태그 넣기. 그리고 반환하는 컴포넌트 제작
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
- https://www.youtube.com/watch?v=EaYfFYZ4f3I

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
