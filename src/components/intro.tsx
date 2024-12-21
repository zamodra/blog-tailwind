import DropdownSearch from "@/components/search-filter";
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { EditPostModal } from "./modal-form";
import { createPost } from "@/lib/api";
import { useQueryClient } from '@tanstack/react-query';

interface Post {
  id: string;
  title: string;
  body: string;
}

export function Intro() {

  const [name, setName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | undefined | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const cookieName = Cookies.get('name');
    const id = Cookies.get('userId')
    setUserId(id)
    setName(cookieName || null);  // Set name only on client side
  }, []);

  const postData = { id: '', title: '', body: '' }

  const clearPostData = () => {
    postData["id"] = ""
    postData["title"] = ""
    postData["body"] = ""
  }
  const handleSave = async (updatedPost: Post) => {
    try {
      await createPost(userId, updatedPost.title, updatedPost.body);
 
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      clearPostData()
      alert(`Post created successfully`);
    } catch (error) {
      console.error('Error creating post:', error);
      clearPostData()
      alert('An error occurred while saving the post. Please try again.');
    }
  };

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex-col">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          Welcome back, <br/>{name}!
        </h1>
        {/* Adjusted styling for "Create new post!" */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="border border-black bg-black text-white text-4xl md:text-6xl font-semibold mt-4 md:mt-6 py-2 px-6 rounded-md hover:bg-white hover:text-black transition-all"
        >
          Create new post
        </button>
      </div>
      <DropdownSearch/>

      <EditPostModal
        ModalTitle="Create new post"
        open={isModalOpen} // Modal open state
        onClose={() => setIsModalOpen(false)} // Modal close handler
        postData={postData}
        onSave={handleSave} // Save handler for the post
      />
    </section>
  );
}
