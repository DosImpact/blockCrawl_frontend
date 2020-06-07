import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

export default withRouter(({ location: { pathname } }) => (
  <Header>
    {console.log(pathname)}
    <List className="Header__List">
      <ListItem>
        <div className="listItem__Header">
          <span>🎨</span>
          <span>Block Crwal</span>
          <span>🎈</span>
        </div>
      </ListItem>
      <ListItem>
        <div className="listItem__New">
          <div className="listItem__NewContainer">
            <div>+ NEW</div>
          </div>
        </div>
      </ListItem>
      <ListItem current={pathname === "/" ? true : false}>
        <SLink to={{ pathname: "/" }}>📄 DashBoard</SLink>
      </ListItem>
      <ListItem current={pathname === "/info" ? true : false}>
        <SLink to={{ pathname: "/info" }}>🌊 Quick Filters</SLink>
      </ListItem>
      <ListItem current={pathname === "/block" ? true : false}>
        <SLink to={{ pathname: "/block" }}>⌛️ block Tasks</SLink>
      </ListItem>
      <ListItem current={pathname === "/team" ? true : false}>
        <SLink to={{ pathname: "/team" }}>🏰 Team Collaborations</SLink>
      </ListItem>
      <ListItem current={pathname === "/DataService" ? true : false}>
        <SLink to={{ pathname: "/dataservice" }}>📊 Data Service</SLink>
      </ListItem>
      <ListItem current={pathname === "/Contact" ? true : false}>
        <SLink to={{ pathname: "/contact" }}>📱 Contact Us</SLink>
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

  .listItem__Header {
    height: 60px;
    width: 100%;
    background-color: ${(props) => props.theme.grayColor};
    display: flex;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }
  .listItem__New {
    display: flex;
    padding: 5px;
    width: 100%;
    justify-content: center;
    align-items: center;

    .listItem__NewContainer {
      background-color: ${(props) => props.theme.lightPupleColor};
      width: 80%;
      height: 40px;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const List = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  height: 60px;
  width: 100%;
  /* border: 3px solid
    ${(props) => (props.current ? props.theme.pupleColor : "transparent")}; */
  background-color: ${(props) =>
    props.current ? props.theme.lightPupleColor : ""};
  color: ${(props) => (props.current ? props.theme.lightGrayColor : "")};
  transition: all 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SLink = styled(Link)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
