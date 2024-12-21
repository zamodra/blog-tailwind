import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-10">
        {posts.map((post) => (
          <PostPreview
            author={post.author || { name: "", email:"" }}
            key={post.id}
            title={post.title}
            slug={post.id}
            excerpt={`${post.body.substring(0, 100)}...`}
            body={post.body}
          />
        ))}
      </div>
    </section>
  );
}
