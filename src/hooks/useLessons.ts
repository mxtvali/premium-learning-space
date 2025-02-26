
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Lesson, Comment } from '../types/database';
import { toast } from 'sonner';

export const useLesson = (lessonId: string) => {
  return useQuery({
    queryKey: ['lessons', lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single();

      if (error) throw error;
      return data as Lesson;
    },
    enabled: !!lessonId,
  });
};

export const useLessonComments = (lessonId: string) => {
  return useQuery({
    queryKey: ['comments', lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, user:profiles(avatar_url, full_name)')
        .eq('lesson_id', lessonId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!lessonId,
  });
};

export const useAddComment = (lessonId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ text, userId }: { text: string; userId: string }) => {
      const { error } = await supabase
        .from('comments')
        .insert([{ lesson_id: lessonId, user_id: userId, text }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', lessonId] });
      toast.success('Комментарий добавлен');
    },
    onError: () => {
      toast.error('Ошибка при добавлении комментария');
    },
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      lessonId, 
      userId, 
      completed 
    }: { 
      lessonId: string; 
      userId: string; 
      completed: boolean;
    }) => {
      const { error } = await supabase
        .from('user_progress')
        .upsert([{ 
          lesson_id: lessonId, 
          user_id: userId, 
          completed,
          last_watched: new Date().toISOString()
        }]);

      if (error) throw error;
    },
    onSuccess: (_, { lessonId }) => {
      queryClient.invalidateQueries({ queryKey: ['progress', lessonId] });
      toast.success('Прогресс сохранен');
    },
    onError: () => {
      toast.error('Ошибка при сохранении прогресса');
    },
  });
};
