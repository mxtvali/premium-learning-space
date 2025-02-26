
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import { Star, ChevronRight } from 'lucide-react';
import { useCourses } from '../hooks/useCourses';
import { toast } from 'sonner';

const categories = [
  "Все курсы",
  "Программирование",
  "Дизайн",
  "Маркетинг",
  "Бизнес",
  "Data Science",
  "Языки"
];

const filters = {
  level: ["Начинающий", "Средний", "Продвинутый"],
  price: ["Все цены", "Бесплатные", "Платные"],
  duration: ["Любая длительность", "0-2 часа", "2-5 часов", "5-10 часов", "10+ часов"],
  rating: ["Любой рейтинг", "4.5+", "4.0+", "3.5+"]
};

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все курсы");
  const { data: courses, isLoading, error } = useCourses();

  if (error) {
    toast.error('Ошибка при загрузке курсов');
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Каталог курсов</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Выберите из более чем 200 курсов от ведущих экспертов. Начните свой путь к новой карьере уже сегодня.
            </p>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-card hover:bg-card-hover text-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(filters).map(([filterName, options]) => (
              <select
                key={filterName}
                className="bg-card border border-white/10 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-primary/50"
              >
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ))}
          </div>
          
          {/* Course grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Показываем скелетон загрузки
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-card rounded-lg mb-4"></div>
                  <div className="h-6 bg-card rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-card rounded w-1/2"></div>
                </div>
              ))
            ) : courses?.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
