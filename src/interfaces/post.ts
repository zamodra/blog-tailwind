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
