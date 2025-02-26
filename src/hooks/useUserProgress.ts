
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Course, UserProgress } from '../types/database';
import { toast } from 'sonner';

export const useUserProgress = (userId: string, courseId: string) => {
  const queryClient = useQueryClient();

  const { data: progress } = useQuery({
    queryKey: ['userProgress', userId, courseId],
    queryFn: async () => {
      const { data: course } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      const { data: lessons } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order', { ascending: true });

      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId);

      return {
        course: course as Course,
        lessons,
        progress: progress as UserProgress[]
      };
    },
    enabled: !!userId && !!courseId,
  });

  const updateProgress = useMutation({
    mutationFn: async ({ lessonId, completed }: { lessonId: string; completed: boolean }) => {
      const { error } = await supabase
        .from('user_progress')
        .upsert([
          {
            user_id: userId,
            lesson_id: lessonId,
            completed,
            last_watched: new Date().toISOString(),
          },
        ]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress', userId, courseId] });
      toast.success('Прогресс обновлен');
    },
    onError: () => {
      toast.error('Ошибка при обновлении прогресса');
    },
  });

  return {
    progress,
    updateProgress,
  };
};

