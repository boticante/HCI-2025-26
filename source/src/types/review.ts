export type Review = {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  avatar?: string;
};

export type ReviewFormData = {
  name: string;
  rating: number;
  review: string;
};
