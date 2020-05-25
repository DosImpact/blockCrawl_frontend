# BlockCrwal/FrontEnd

## published site

[https://dosimpact.github.io/blockCrawl_frontend/](https://dosimpact.github.io/blockCrawl_frontend/)

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

```js
const HELLO_4 = gql`
  query hello($id: Int!, $name: String!, $info: [String!]!) {
    hello4(id: $id, name: $name, info: $info)
  }
`;

const QueryPractice = () => {
  const [getHello, { loading, data }] = useLazyQuery(HELLO_4);
  const handleClick = () => {
    console.log("handleClick Event");
    getHello({
      variables: {
        id: 777,
        name: "DOSimpact",
        info: ["im handsome", "eat kimchi"],
      },
    });
  };
  return (
    <>
      <h2>Query Practice</h2>
      {loading && "Loading..."}
      {data && JSON.stringify(data)}
      <button onClick={handleClick}>Fetching</button>
    </>
  );
};
```
