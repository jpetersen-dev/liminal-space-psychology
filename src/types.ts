export interface Therapist {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  price: string;
  iconType: "individual" | "couple" | "online" | "family";
  imageUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string; // New: Full HTML or Markdown string for the reader
  category: string; // New: Tag/Category for filtering
  date: string;
  imageUrl: string;
}

export interface TimeSlot {
  datetime: Date;
  available: boolean;
}
