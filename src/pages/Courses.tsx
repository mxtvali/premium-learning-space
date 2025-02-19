import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import { Star, ChevronRight } from 'lucide-react';

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

const coursesData = [
  {
    title: "Основы Web-разработки 2024",
    author: "Александр Петров",
    rating: 4.8,
    students: 1234,
    duration: "20 часов",
    price: 15000,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    title: "UX/UI Дизайн с нуля до PRO",
    author: "Мария Иванова",
    rating: 4.9,
    students: 856,
    duration: "30 часов",
    price: 20000,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    title: "Python для Data Science",
    author: "Дмитрий Соколов",
    rating: 4.7,
    students: 2341,
    duration: "40 часов",
    price: 25000,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    title: "JavaScript Mastery: Полное руководство",
    author: "Игорь Васильев",
    rating: 4.9,
    students: 3421,
    duration: "45 часов",
    price: 18000,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    title: "React & TypeScript: Разработка приложений",
    author: "Екатерина Смирнова",
    rating: 4.8,
    students: 2156,
    duration: "35 часов",
    price: 22000,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    title: "Figma: От новичка до PRO",
    author: "Анна Петрова",
    rating: 4.7,
    students: 1893,
    duration: "25 часов",
    price: 16000,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  }
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все курсы");
  const [searchQuery, setSearchQuery] = useState("");

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
            {coursesData.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
          
          {/* Load more */}
          <div className="text-center mt-12">
            <button className="btn-secondary flex items-center gap-2 mx-auto group">
              Загрузить ещё
              <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
