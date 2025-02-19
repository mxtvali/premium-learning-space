
import React from 'react';
import { Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 top-0 px-6 py-4 glass-card">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="/" className="text-2xl font-display font-bold">
            EduPro
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/courses" className="nav-link">Курсы</a>
            <a href="/about" className="nav-link">О нас</a>
            <a href="/pricing" className="nav-link">Цены</a>
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
          
          <button className="btn-secondary">Войти</button>
          <button className="btn-primary flex items-center gap-2">
            <User size={20} />
            Регистрация
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
