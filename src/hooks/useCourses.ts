
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Course } from '../types/database';
import { toast } from 'sonner';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Course[];
    },
  });
};

export const useCourseDetails = (courseId: string) => {
  return useQuery({
    queryKey: ['courses', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error) throw error;
      return data as Course;
    },
    enabled: !!courseId,
  });
};

export const useCourseLessons = (courseId: string) => {
  return useQuery({
    queryKey: ['lessons', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });
};

export const usePurchaseCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, userId }: { courseId: string; userId: string }) => {
      const { error } = await supabase
        .from('user_courses')
        .insert([{ user_id: userId, course_id: courseId }]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Курс успешно приобретен');
      queryClient.invalidateQueries({ queryKey: ['userCourses'] });
    },
    onError: () => {
      toast.error('Ошибка при покупке курса');
    },
  });
};
