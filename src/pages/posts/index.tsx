import Container from "@/components/container";
import { Intro } from "@/components/intro";
import { MoreStories } from "@/components/more-stories";
import { Pagination } from "@/components/pagination";
import { getPostsByPageWithUser } from "@/lib/api";
import { Post } from "@/interfaces/post";

import { usePosts } from "@/context/PostContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query"; // Import TanStack Query
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Fetch posts function
const fetchPosts = async (page: number): Promise<Post[]> => {
  return await getPostsByPageWithUser(page);
};

const Index: React.FC = () => {
  const { initPosts, filteredPosts, searchTerm, posts } = usePosts();
  const router = useRouter();
  const pageFromQuery = parseInt(router.query.page as string) || 1;
  const [currentPage, setCurrentPage] = useState<number>(pageFromQuery);

  const { 
    isError, 
    error, 
    data, 
    isFetching, 

  } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (data?.length) {
      initPosts(data); 
    }
  }, [data, initPosts]);

  const listPosts = searchTerm ? filteredPosts : posts || [];

  const totalPages = 100; 


  return (
    <main>
      <Container>
        <Intro />
        {isFetching ? (
          <div className="flex justify-center items-center w-full h-32">
              <h3 className="text-3xl mb-3 leading-snug">Loading...</h3>
          </div>
          ) : isError ? (
          <div className="flex justify-center items-center w-full h-32">
              <h3 className="text-3xl mb-3 leading-snug text-red-500">
              Error fetching posts: {error.message}
              </h3>
          </div>
          ) : (
          <>
              {!listPosts.length ? (
              <div className="flex justify-center items-center w-full h-32">
                  <h3 className="text-3xl mb-3 leading-snug">No Data Available</h3>
              </div>
              ) : (
              <MoreStories posts={listPosts} />
              )}
              {!searchTerm && (
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
              />
              )}
          </>
          )}

      </Container>
    </main>
  );
};

export default Index;
