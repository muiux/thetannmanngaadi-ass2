import React, { useContext, useState } from "react";
import { createPost } from "../services/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";

const CreatePostWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 768px) {
      gap: 15px;
    }
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 1rem;
    color: #555;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  input,
  textarea {
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
      outline: none;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 10px;
    }
  }

  textarea {
    resize: vertical;
    min-height: 150px;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 18px;
  }
`;

const CreatePost = () => {
  const { addPost } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ title, body })
      .then((response) => {
        const { data } = response;
        navigate("/");
        addPost(data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <CreatePostWrapper>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <FormField>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <label>Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </FormField>
        <SubmitButton type="submit">Create Post</SubmitButton>
      </form>
    </CreatePostWrapper>
  );
};

export default CreatePost;
