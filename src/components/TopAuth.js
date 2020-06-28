import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Input from "../components/Input";
import LabelBox from "../components/Box";
import Button from "../components/Button";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.lightGrayColor};
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const From = styled(Box)`
  height: 100%;
  form {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & div,
    input,
    button {
      margin-right: 10px;
    }
  }
`;

const StateChanger = styled(Box)`
  height: 100%;
`;

const QUERY = gql`
  query {
    isLoggedIn @client
  }
`;

const TopAuth = () => {
  const [action, setAction] = useState("logout");
  //const { data } = useQuery(QUERY);
  //console.log(data);
  return (
    <Wrapper>
      {action === "logout" ? (
        <>
          <From>
            <form>
              <LabelBox content={"이메일"} />
              <Input />
              <LabelBox content={"비밀번호"} />
              <Input />
              <Button text={"Login"} />
              <Button text={"SignUp"} />
            </form>
          </From>
        </>
      ) : (
        <From>
          <form>
            <LabelBox content={"이메일"} />
            <Input />
            <LabelBox content={"비밀번호"} />
            <Input />
          </form>
        </From>
      )}
    </Wrapper>
  );
};

export default TopAuth;
