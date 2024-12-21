import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostProvider } from "@/context/PostContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PostProvider>
        <Component {...pageProps} />
      </PostProvider>
    </QueryClientProvider>
  )
}
