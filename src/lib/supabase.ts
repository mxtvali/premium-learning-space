
import { createClient } from '@supabase/supabase-js';

// Проверяем наличие переменных окружения
const supabaseUrl = 'https://tpaxvfnoklyebkqorbwb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwYXh2Zm5va2x5ZWJrcW9yYndpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1ODg5NzksImV4cCI6MjAyNjE2NDk3OX0.b0_y8NtSZp5V_ic3v6EHGaxAHBe8iucSXocz5LbIWmg';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Проверка роли пользователя (учитель)
export const isTeacher = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking user role:', error);
    return false;
  }

  return data?.role === 'teacher';
};

// Проверка роли пользователя (админ)
export const isAdmin = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking user role:', error);
    return false;
  }

  return data?.role === 'admin';
};

// Получение роли пользователя
export const getUserRole = async (userId: string): Promise<'student' | 'teacher' | 'admin' | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error getting user role:', error);
    return null;
  }

  return data?.role || null;
};

// Создание нового пользователя с указанной ролью
export const createUser = async (userData: {
  email: string;
  role: 'student' | 'teacher' | 'admin';
  full_name: string;
}) => {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return data;
};

