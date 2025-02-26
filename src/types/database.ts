
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
  prerequisites?: string[];
  learning_objectives?: string[];
  target_audience?: string[];
  teacher_id?: string;
  published: boolean;
  updated_at: string;
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

export interface CourseEnrollment {
  id: string;
  course_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export type UserRole = 'student' | 'teacher' | 'admin';

