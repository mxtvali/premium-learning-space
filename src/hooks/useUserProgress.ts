
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { UserProgress, UserCourse } from '../types/database';

export const useUserCourses = (userId: string) => {
  return useQuery({
    queryKey: ['userCourses', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_courses')
        .select('*, course:courses(*)')
        .eq('user_id', userId);

      if (error) throw error;
      return data as (UserCourse & { course: Course })[];
    },
    enabled: !!userId,
  });
};

export const useUserProgress = (userId: string, courseId: string) => {
  return useQuery({
    queryKey: ['progress', userId, courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId);

      if (error) throw error;
      return data as UserProgress[];
    },
    enabled: !!userId && !!courseId,
  });
};

export const useHasPurchased = (userId: string, courseId: string) => {
  return useQuery({
    queryKey: ['hasPurchased', userId, courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return !!data;
    },
    enabled: !!userId && !!courseId,
  });
};
