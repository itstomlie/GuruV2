export interface IVideo {
  id: string;
  title?: string;
  uri: any;
  author: string;
  avatar?: string;
  description: string;
  hashtags: string;
  datePosted: string;
  likes: number;
  comments: number;
  bookmarks: number;
  shares: number;
}
