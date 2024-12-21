import axios, { InternalAxiosRequestConfig } from "axios";
import { Post } from "@/interfaces/post";
import { User } from "@/interfaces/user";
import Cookies from 'js-cookie'

// API Base URL and Authorization Token
const API_URL = "https://gorest.co.in/public/v2";

// Axios instance with Authorization header
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // validateStatus: (status: number) => {
  //   if (status < 500) {
  //     return true; 
  //   }
  //   return status === 500;
  // },
});


// Extend AxiosRequestConfig to include isSSR property and correct headers typing
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  isSSR?: boolean; // Optional custom property for SSR check
  token?: string;
}

// Axios request interceptor with type-safe config
apiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    let token: string | undefined = Cookies.get('token'); 

    if (config.isSSR && config.token) {
      token = config.token; 
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await apiClient.get("/posts", {
      params: { per_page: 5 }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw new Error("Failed to fetch posts");
  }
}


export async function getPostsByPageWithUser(page: number): Promise<Post[]> {
  try {
    // Step 1: Fetch posts
    const response = await apiClient.get("/posts", {
      params: { page, per_page: 20 }, // Pass the page and per_page params
    });

    // Step 2: Fetch user data for each post
    const postsWithAuthors = await Promise.all(
      response.data.map(async (post: Post) => {
        const userData = await getUserById(post.user_id); // Fetch user by user_id
        return {
          ...post,
          author: userData, // Attach user data to the post
        };
      })
    );

    return postsWithAuthors; // Return posts with attached author data
  } catch (error) {
    console.error(`Error fetching posts for page ${page}:`, error);
    throw new Error(`Failed to fetch posts for page ${page}`);
  }
}

// Fetch user by ID with fallback to dummy data if not found
export async function getUserById(userId: number): Promise<{ name:string, email: string}> {
  try {
    const response = await apiClient.get(`/users/${userId}`);

    // If the response doesn't return a valid user, handle it here
    if (!response.data || Object.keys(response.data).length === 0) {
      console.warn(`No user found with ID ${userId}, returning dummy data.`);
      return getDummyUser(); // Return dummy user data
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return getDummyUser(); 
  }
}

function getDummyUser() {
  return {
    name: "Anonymous User",
    email: "no-email@example.com",
  };
}

// Fetch post by ID
export async function getPostById(postId: number): Promise<Post> {
  try {
    // Fetch the post data first
    const response = await apiClient.get(`/posts/${postId}`);
    const post = response.data;

    // If post data is fetched successfully, retrieve the user (author) data using the user_id
    if (post && post.user_id) {
      const user = await getUserById(post.user_id); // Fetch the user by user_id
      post.author = user; // Attach the user data under the author key
    }

    return post;
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
    throw new Error(`Failed to fetch post with ID ${postId}`);
  }
}

export async function deletePostById(postId: string): Promise<Post> {
  try {
    // Fetch the post data first
    const response = await apiClient.delete(`/posts/${postId}`);
    const post = response.data;

    return post;
  } catch (error) {
    console.error(`Error delete post with ID ${postId}:`, error);
    throw new Error(`Failed to delete post with ID ${postId}`);
  }
}

export async function createPost(userId: string | undefined | null, title: string, body: string): Promise<Post> {
  try {
    // Prepare the data for the new post
    const newPostData = {
      title,
      body
    };

    // Make a POST request to create a new post
    const response = await apiClient.post(`/users/${userId}/posts`, newPostData);

    // Extract and return the created post data
    const post = response.data;
    return post;
  } catch (error) {
    console.error(`Error creating post for user ID ${userId}:`, error);
    throw new Error(`Failed to create post for user ID ${userId}`);
  }
}


export async function updatePostById(postId: string, title: string, body: string): Promise<Post> {
  try {
    const updatedData = { title, body };

    const response = await apiClient.put(`/posts/${postId}`, updatedData);

    const post = response.data;
    return post;
  } catch (error) {
    console.error(`Error updating post with ID ${postId}:`, error);
    throw new Error(`Failed to update post with ID ${postId}`);
  }
}

// Fetch user by name for search functionality
export async function searchUserByName(name: string): Promise<User[]> {
  try {
    const response = await apiClient.get("/users", {
      params: { name: name, per_page: 10 }, // Limit to first 10 for search
    });
    return response.data;
  } catch (error) {
    console.error("Error searching user by name:", error);
    throw new Error("Failed to search user");
  }
}

// Fetch posts by user ID
export async function getPostsByUserId(userId: number): Promise<Post[]> {
  try {
    const response = await apiClient.get(`/posts`, {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for user ID ${userId}:`, error);
    throw new Error(`Failed to fetch posts for user ID ${userId}`);
  }
}


