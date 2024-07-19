import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  background: #282c34;
  padding: 20px;
  color: white;
  text-align: center;

  @media (max-width: 600px) {
    padding: 10px;
  }

  nav {
    margin-top: 10px;

    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
    }

    a {
      color: white;
      text-decoration: none;
      margin: 0 10px;
      font-size: 18px;

      @media (max-width: 600px) {
        margin: 5px 0;
      }
    }
  }
`;

const Header = () => (
  <HeaderWrapper>
    <h1>Blog Post Application</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/create">Create Post</Link>
    </nav>
  </HeaderWrapper>
);

export default Header;
