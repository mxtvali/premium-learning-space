
import React from 'react';
import { Play, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen pt-24 pb-20 flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Освой новую профессию.
            <br />
            <span className="text-primary">Изучи навыки.</span> Зарабатывай.
          </h1>
          
          <p className="text-xl text-gray-300 mb-10">
            Получи доступ к лучшим курсам от экспертов индустрии. Начни учиться прямо сейчас.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary flex items-center gap-2 group">
              <Play size={20} className="group-hover:translate-x-0.5 transition-transform" />
              Начать бесплатно
            </button>
            <button className="btn-secondary flex items-center gap-2 group">
              Посмотреть курсы
              <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-gray-400">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50K+</p>
              <p>Студентов</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">200+</p>
              <p>Курсов</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4.8</p>
              <p>Рейтинг</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
