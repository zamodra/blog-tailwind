'use client';

import { ReactNode, useState, ChangeEvent } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

interface Post {
  id: string;
  title: string;
  body: string;
}

interface EditPostModalProps {
  ModalTitle?: string;
  open: boolean;
  onClose: () => void;
  postData: Post; // The post data to be edited
  onSave: (updatedPost: Post) => void; // Callback to handle saving the post
}

export function EditPostModal({
  open,
  onClose,
  postData,
  onSave,
  ModalTitle="",
}: EditPostModalProps) {
  // Local state to manage form input values
  const [title, setTitle] = useState(postData.title);
  const [body, setBody] = useState(postData.body);
  const [error, setError] = useState<string>('');

  // Handle change for title and body fields
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newBody = e.target.value;
    if (newBody.length <= 500) {
      setBody(newBody);
      setError(''); // Clear error when the input is valid
    } else {
      setBody(prev => prev)
      setError('Maximum character limit of 500 reached.');
    }
  };

  // Handle form submission to save the updated post
  const handleSave = () => {
    const updatedPost: Post = { id: postData.id, title, body };
    onSave(updatedPost); // Call onSave callback to pass the updated post
    onClose(); // Close the modal
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {/* Header */}
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  {ModalTitle || "Edit Post"}
                </DialogTitle>
              </div>
            </div>

            {/* Form Fields */}
            <div className="mt-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              <label htmlFor="body" className="block mt-4 text-sm font-medium text-gray-700">
                Body
              </label>
              <textarea
                id="body"
                value={body}
                onChange={handleBodyChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={15}
              />
              {/* Display error message if character limit is exceeded */}
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  {body.length}/500 characters
                </p>
            </div>

            {/* Actions (Buttons) */}
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
