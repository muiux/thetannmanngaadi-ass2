import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostContext } from "../context/PostContext";

const PostListWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  input {
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  div {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      margin: 0;
      font-size: 24px;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    p {
      margin: 10px 0;
      font-size: 16px;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }

    a {
      text-decoration: none;
      color: #007bff;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

const PageButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? "#007bff" : "white")};
  color: ${(props) => (props.active ? "white" : "#007bff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      !props.disabled && !props.active ? "#e9ecef" : undefined};
    color: ${(props) =>
      !props.disabled && !props.active ? "#0056b3" : undefined};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2rem;
  text-align: center;
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #007bff;
`;

const PostList = () => {
  const { posts, loading, error, page, setPage, totalPages, postsPerPage } =
    useContext(PostContext);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastPost = useMemo(
    () => page * postsPerPage,
    [page, postsPerPage]
  );
  const indexOfFirstPost = useMemo(
    () => indexOfLastPost - postsPerPage,
    [indexOfLastPost, postsPerPage]
  );
  const currentPosts = useMemo(
    () => posts.slice(indexOfFirstPost, indexOfLastPost),
    [indexOfFirstPost, indexOfLastPost, posts]
  );
  const filteredPosts = useMemo(
    () =>
      currentPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [currentPosts, searchTerm]
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error)
    return <ErrorMessage>Error fetching posts: {error.message}</ErrorMessage>;

  return (
    <PostListWrapper>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredPosts.map((post) => (
        <div key={post.id}>
          <h2>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{post.body.substring(0, 100)}...</p>
        </div>
      ))}
      <Pagination>
        <PageButton
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </PageButton>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            active={page === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
        <PageButton
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </PageButton>
      </Pagination>
    </PostListWrapper>
  );
};

export default PostList;
