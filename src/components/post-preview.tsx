import Link from "next/link";
import { Author } from "@/interfaces/author";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { DeleteConfirmationModal } from "./modal-confirmation";
import { EditPostModal } from "./modal-form";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { deletePostById, updatePostById } from "@/lib/api";
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  title: string;
  excerpt: string;
  slug: string | number;
  author: Author,
  body: string
};

interface UpdatedPost {
  id: string;
  title: string;
  body: string;
}

type DropdownProps = { 
  slug: string;
  selectedPost: UpdatedPost; // Assuming selectedPost contains the post data for editing
}

function Dropdown({ slug, selectedPost }:DropdownProps) {

  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      
      // Call the delete API
      await deletePostById(slug); 
      
      queryClient.invalidateQueries({ queryKey: ['posts'] }); 
  
      setOpen(false); 

      alert(`Post deleted successfully`);
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('An error occurred while deleting the post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async (updatedPost: UpdatedPost) => {
    try {
      await updatePostById(String(slug), updatedPost.title, updatedPost.body);
 
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      setOpenEditModal(false);

      alert(`Post updated successfully`);
    } catch (error) {
      console.error('Error updating post:', error);
      alert('An error occurred while saving the post. Please try again.');
    }
  };


  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {/* Three Dots Menu Button */}
        <MenuButton className="text-gray-500 hover:text-gray-800">
          •••
        </MenuButton>
      </div>
      <DeleteConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Post"
        description={`Are you sure you want to delete the post with ID ${slug}? This action cannot be undone.`}
        icon={<ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />}
        actions={
          <>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                isLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-500'
              }`}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </>
        }
      />

      <EditPostModal
        open={openEditModal} 
        onClose={() => setOpenEditModal(false)}
        postData={selectedPost} 
        onSave={handleSaveEdit} 
      />

      {/* Dropdown Menu Items */}
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none"
      >
        <div className="py-1">
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-2 text-sm ${
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                }`}
                onClick={() => setOpenEditModal(true)}
              >
                Edit
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-2 text-sm ${
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                }`}
                onClick={() => setOpen(true)}
              >
                Delete
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-2 text-sm ${
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                }`}
              >
                View
              </a>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
export function PostPreview({
  title,
  excerpt,
  slug,
  author,
  body
}: Props) {
  return (
    <div>
     <div className="flex items-top justify-between">
        <h3 className="text-3xl mb-3 leading-snug" style={{ width:"90%"}}>
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <Dropdown 
          slug={String(slug)} 
          selectedPost={{id:String(slug), title, body}}
        />
      </div>

      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>

      {author.name && (
        <div className="text-sm text-gray-500">
          <span>Written by</span>{" "}
          <span className="underline">{author.name || "-"}</span>
          
          {/* Display email below the name */}
          {author.email && (
            <div className="text-xs text-gray-400 mt-1">
              <span>{author.email}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
