
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabase';
import { Course } from '../types/database';

const CreateCourse = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: createCourse } = useMutation({
    mutationFn: async (courseData: Partial<Course>) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Необходимо авторизоваться');

      const { data, error } = await supabase
        .from('courses')
        .insert([
          {
            ...courseData,
            teacher_id: userData.user.id,
            published: false,
            students_count: 0,
            rating: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Курс успешно создан');
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error('Ошибка при создании курса: ' + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const courseData: Partial<Course> = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      image: formData.get('image') as string,
      duration: formData.get('duration') as string,
      level: formData.get('level') as string,
      category: formData.get('category') as string,
      prerequisites: (formData.get('prerequisites') as string).split(',').map(p => p.trim()),
      learning_objectives: (formData.get('learning_objectives') as string).split(',').map(o => o.trim()),
      target_audience: (formData.get('target_audience') as string).split(',').map(t => t.trim()),
      author: formData.get('author') as string,
    };

    createCourse(courseData);
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-8">Создать новый курс</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Название курса
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full bg-card border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Описание курса
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="w-full bg-card border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium mb-2">
                    Цена (в рублях)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    className="w-full bg-card border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium mb-2">
                    Длительность
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    required
                    placeholder="Например: 20 часов"
                    className="w-full bg-card border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="level" className="block text-sm font-medium mb-2">
                    Уровень сложности
                  </label>
                  <select
                    id="level"
                    name="level"
                    required
                    className="w-full bg-card border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Начинающий">Начинающий</option>
                    <option value="Средний">Средний</option>
                    <option value="Продвинутый">Продвинутый</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Категория
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="w-full bg-card border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Программирование">Программирование</option>
                    <option value="Дизайн">Дизайн</option>
                    <option value="Маркетинг">Маркетинг</option>
                    <option value="Бизнес">Бизнес</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-2">
                  URL изображения курса
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-card border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-2">
                  Автор курса
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                  className="w-full bg-card border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="prerequisites" className="block text-sm font-medium mb-2">
                  Предварительные требования (через запятую)
                </label>
                <input
                  type="text"
                  id="prerequisites"
                  name="prerequisites"
                  placeholder="Например: Базовый JavaScript, HTML, CSS"
                  className="w-full bg-card border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="learning_objectives" className="block text-sm font-medium mb-2">
                  Цели обучения (через запятую)
                </label>
                <input
                  type="text"
                  id="learning_objectives"
                  name="learning_objectives"
                  placeholder="Например: Создание веб-приложений, Работа с API"
                  className="w-full bg-card border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="target_audience" className="block text-sm font-medium mb-2">
                  Целевая аудитория (через запятую)
                </label>
                <input
                  type="text"
                  id="target_audience"
                  name="target_audience"
                  placeholder="Например: Начинающие разработчики, Студенты"
                  className="w-full bg-card border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 mt-8"
            >
              {isLoading ? 'Создание курса...' : 'Создать курс'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;
