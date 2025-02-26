
export interface Course {
  id: string;
  title: string;
  description: string;
  author: string;
  price: number;
  image: string;
  duration: string;
  level: string;
  category: string;
  rating: number;
  students_count: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_url: string;
  order: number;
  duration: string;
  is_free: boolean;
}

export interface Comment {
  id: string;
  lesson_id: string;
  user_id: string;
  text: string;
  created_at: string;
  user: {
    avatar_url: string;
    full_name: string;
  };
}

export interface UserProgress {
  user_id: string;
  lesson_id: string;
  completed: boolean;
  last_watched: string;
}

export interface UserCourse {
  user_id: string;
  course_id: string;
  purchased_at: string;
}
