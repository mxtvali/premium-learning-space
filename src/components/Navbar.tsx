
import React, { useEffect, useState } from 'react';
import { Search, Plus, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getUserRole } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

const Navbar = () => {
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const role = await getUserRole(user.id);
        setUserRole(role);
      }
    };

    checkUser();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Ошибка при выходе из системы');
    } else {
      toast.success('Вы успешно вышли из системы');
    }
  };

  return (
    <nav className="fixed w-full z-50 top-0 px-6 py-4 glass-card">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-display font-bold">
            EduPro
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="nav-link">Курсы</Link>
            {userId && <Link to="/dashboard" className="nav-link">Дашборд</Link>}
            {(userRole === 'teacher' || userRole === 'admin') && (
              <Link to="/create-course" className="nav-link flex items-center gap-2">
                <Plus size={20} />
                Создать курс
              </Link>
            )}
            {userRole === 'admin' && (
              <Link to="/admin" className="nav-link flex items-center gap-2">
                <Settings size={20} />
                Админ панель
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <input 
              type="text"
              placeholder="Поиск курсов..."
              className="bg-card/50 border border-white/10 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-primary/50"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
          
          {!userId ? (
            <div className="flex gap-4">
              <button 
                onClick={() => window.location.href = '/signin'}
                className="btn-secondary"
              >
                Войти
              </button>
              <button 
                onClick={() => window.location.href = '/signup'}
                className="btn-primary"
              >
                Регистрация
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={handleSignOut}
                className="btn-secondary"
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

