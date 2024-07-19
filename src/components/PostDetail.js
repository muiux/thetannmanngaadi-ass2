import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from "../services/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";

const PostDetailWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #333;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
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

const DeleteButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`;

const PostDetail = () => {
  const { id } = useParams();
  const { deletePost } = useContext(PostContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.fetchPostById(id)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    API.deletePost(id)
      .then(() => {
        deletePost(id);
        navigate("/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error)
    return <ErrorMessage>Error fetching post: {error.message}</ErrorMessage>;

  return (
    <PostDetailWrapper>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <DeleteButton onClick={handleDelete}>Delete Post</DeleteButton>
        </>
      )}
    </PostDetailWrapper>
  );
};

export default PostDetail;
