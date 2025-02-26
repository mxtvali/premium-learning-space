
import React from 'react';
import { Search, Plus } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const isTeacher = user?.publicMetadata?.role === 'teacher';
  const isAdmin = user?.publicMetadata?.role === 'admin';

  return (
    <nav className="fixed w-full z-50 top-0 px-6 py-4 glass-card">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-display font-bold">
            EduPro
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="nav-link">Курсы</Link>
            {isSignedIn && <Link to="/dashboard" className="nav-link">Дашборд</Link>}
            {(isTeacher || isAdmin) && (
              <Link to="/create-course" className="nav-link flex items-center gap-2">
                <Plus size={20} />
                Создать курс
              </Link>
            )}
            {isAdmin && <Link to="/admin" className="nav-link">Админ панель</Link>}
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
          
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="btn-secondary">Войти</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn-primary">Регистрация</button>
              </SignUpButton>
            </>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

