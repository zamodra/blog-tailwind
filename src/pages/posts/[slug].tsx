import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Container from "@/components/container";
import Header from "@/components/header";
import { PostBody } from "@/components/post-body";
import { PostHeader } from "@/components/post-header";
import { getPostById } from "@/lib/api"; // Use the updated getPostById function

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;

  const postId = slug ? parseInt((slug as string).replace("post-", "")) : null;

  // UseQuery for fetching the post with TanStack Query configuration
  const {
    data: post,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId!), 
    placeholderData: undefined, 
    staleTime: 5 * 60 * 1000, 
    enabled: !!postId, 
    refetchOnWindowFocus: false, 
  });

  if (!postId) {
    return <div>Loading...</div>; // Initial state when slug is undefined
  }

  if (isLoading || isFetching) {
    return (
      <main>
        <Container>
          <Header />
          <div className="flex justify-center items-center">
            <p>Loading post...</p>
          </div>
        </Container>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <Container>
          <Header />
          <div className="flex justify-center items-center h-screen text-red-500">
            <p>Error fetching post: {error.message}</p>
          </div>
        </Container>
      </main>
    );
  }

  if (!post) {
    return (
      <main>
        <Container>
          <Header />
          <div className="flex justify-center items-center h-screen">
            <p>Post not found</p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader post={post} />
          <PostBody content={post.body} />
        </article>
      </Container>
    </main>
  );
}
