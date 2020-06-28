import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

export default withRouter(({ location: { pathname } }) => (
  <Header>
    {console.log(pathname)}
    <List className="Header__List">
      <ListItem>
        <div className="listItem__Header">
          <span>Block Crwal</span>
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
        <SLink to={{ pathname: "/" }}>
          <span role="img" aria-label="emojies">
            📄 DashBoard
          </span>
        </SLink>
      </ListItem>
      <ListItem current={pathname === "/info" ? true : false}>
        <SLink to={{ pathname: "/info" }}>
          <span role="img" aria-label="emojies">
            🌊 Quick Filters
          </span>
        </SLink>
      </ListItem>
      <ListItem current={pathname === "/block" ? true : false}>
        <SLink to={{ pathname: "/block" }}>
          <span role="img" aria-label="emojies">
            ⌛️ block Tasks
          </span>
        </SLink>
      </ListItem>
      <ListItem current={pathname === "/team" ? true : false}>
        <SLink to={{ pathname: "/team" }}>
          <span role="img" aria-label="emojies">
            🏰 Team Collaborations
          </span>
        </SLink>
      </ListItem>
      <ListItem current={pathname === "/DataService" ? true : false}>
        <SLink to={{ pathname: "/dataservice" }}>
          <span role="img" aria-label="emojies">
            📊 Data Service
          </span>
        </SLink>
      </ListItem>
      <ListItem current={pathname === "/Contact" ? true : false}>
        <SLink to={{ pathname: "/contact" }}>
          <span role="img" aria-label="emojies">
            📱 Contact Us
          </span>
        </SLink>
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
  font-weight: 500;
  font-size: 14px;

  .listItem__Header {
    font-weight: 900;
    font-size: 20px;
    text-transform: uppercase;
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
