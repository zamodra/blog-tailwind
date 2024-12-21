import { PostTitle } from "@/components/post-title";
import { type Post } from "@/interfaces/post"; // Adjust the import for the Post interface

type Props = {
  post: Post; // Pass the entire post as a prop
};

export function PostHeader({ post }: Props) {
  return (
    <>
      {/* Centered author information */}
      {post.author?.name && (
        <div className="mb-3">
          <div className="text-sm text-gray-500">
            <span>Written by </span>
            <span className="underline">{post.author.name}</span>
          </div>
          {post.author.email && (
            <div className="text-sm text-gray-500 mt-1">
              <span>{post.author.email}</span>
            </div>
          )}
        </div>
      )}
      <PostTitle>{post.title}</PostTitle>
    </>
  );
}
