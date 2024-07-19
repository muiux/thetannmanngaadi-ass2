import React, { createContext, useState, useEffect, useMemo } from "react";
import { fetchPosts } from "../services/api";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(10);

  const totalPages = useMemo(
    () => Math.ceil(posts.length / postsPerPage),
    [posts, postsPerPage]
  );

  useEffect(() => {
    fetchPosts()
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const addPost = (newPost) => {
    setPosts((posts) => [...posts, newPost]);
  };

  const deletePost = (id) => {
    setPosts((posts) => posts.filter((post) => Number(post.id) !== Number(id)));
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        setPosts,
        addPost,
        deletePost,
        page,
        setPage,
        totalPages,
        postsPerPage,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
