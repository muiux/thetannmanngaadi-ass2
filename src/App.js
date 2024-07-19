import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";
import styled from "styled-components";
import { PostProvider } from "./context/PostContext";

const AppWrapper = styled.div`
  font-family: Arial, sans-serif;
`;

function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Header />
        <PostProvider>
          <Routes>
            <Route exact path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </PostProvider>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
