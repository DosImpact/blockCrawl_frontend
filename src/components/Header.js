import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

export default withRouter(({ location: { pathname } }) => (
  <Header>
    {console.log(pathname)}
    <List>
      <ListItem current={pathname === "/" ? true : false}>
        <SLink to={{ pathname: "/" }}>Main</SLink>
      </ListItem>
      <ListItem current={pathname === "/info" ? true : false}>
        <SLink to={{ pathname: "/info" }}>Info</SLink>
      </ListItem>
      <ListItem current={pathname === "/profile" ? true : false}>
        <SLink to={{ pathname: "/profile" }}>Profile</SLink>
      </ListItem>
    </List>
  </Header>
));

const Header = styled.header`
  height: 100%;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.lightGrayColor};
  color: ${(props) => props.theme.darkColor};
  font-weight: 600;
  font-size: 14px;
`;

const List = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  height: 100%;
  border-bottom: 3px solid
    ${(props) => (props.current ? props.theme.pupleColor : "transparent")};
  transition: all 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
