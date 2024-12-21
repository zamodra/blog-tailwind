import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  date?: string;
  slug?: string;
  coverImage?: string;
  author?: {
    name: string;
    email: string;
  };
  excerpt?: string;
}

interface PostContextType {
  posts: Post[];
  filteredPosts: Post[];
  searchTerm: string;
  setSearchTerm: (query: string) => void;
  addPost: (post: Post) => void;
  updatePost: (id: number, updatedPost: Post) => void;
  removePost: (id: number) => void;
  initPosts: (initialPosts: Post[]) => void;
  filterPosts: (query: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("")

  const addPost = (post: Post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const updatePost = (id: number, updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post))
    );
  };

  const removePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const initPosts = (initialPosts: Post[]) => {
    setPosts(initialPosts); // Initialize posts with the provided data
  };

  const filterPosts = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = posts.filter((post) => 
      post.title.toLowerCase().includes(lowercasedQuery) || 
      post.body.toLowerCase().includes(lowercasedQuery)
    );
    setSearchTerm(query);
    setFilteredPosts(filtered);
  };

  return (
    <PostContext.Provider value={{ searchTerm, setSearchTerm, posts, initPosts, filterPosts, filteredPosts, addPost, updatePost, removePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};
