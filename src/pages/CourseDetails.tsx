
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialCard from '../components/TestimonialCard';
import { Play, Users, Clock, Star, ChevronRight } from 'lucide-react';

// Моковые данные для примера
const courseData = {
  title: "JavaScript Mastery: Полное руководство",
  author: "Игорь Васильев",
  rating: 4.9,
  students: 3421,
  duration: "45 часов",
  price: 18000,
  image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  description: `Этот курс предназначен для тех, кто хочет освоить JavaScript с нуля и стать профессиональным разработчиком. Вы изучите все основные концепции языка, работу с DOM, асинхронное программирование, современные фреймворки и многое другое.`,
  whatYouWillLearn: [
    "Основы JavaScript и ECMAScript",
    "Работа с DOM и событиями",
    "Асинхронное программирование",
    "Работа с API и сетевыми запросами",
    "Современные фреймворки и библиотеки",
    "Оптимизация и лучшие практики"
  ],
  modules: [
    {
      title: "Введение в JavaScript",
      lessons: [
        "Установка необходимого ПО",
        "Основы синтаксиса",
        "Переменные и типы данных",
        "Операторы и выражения"
      ]
    },
    {
      title: "Функции и объекты",
      lessons: [
        "Функции и их виды",
        "Область видимости",
        "Объекты и прототипы",
        "Классы и ООП"
      ]
    }
  ]
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const [selectedModule, setSelectedModule] = useState(0);

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="relative aspect-[21/9] max-h-[500px] overflow-hidden">
          <img 
            src={courseData.image}
            alt={courseData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  {courseData.title}
                </h1>
                
                <div className="flex items-center gap-6 text-gray-300 mb-8">
                  <p className="flex items-center gap-2">
                    <Star size={20} className="text-yellow-400" />
                    {courseData.rating} рейтинг
                  </p>
                  <p className="flex items-center gap-2">
                    <Users size={20} />
                    {courseData.students} студентов
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={20} />
                    {courseData.duration}
                  </p>
                </div>
                
                <p className="text-lg text-gray-300 mb-8">
                  {courseData.description}
                </p>
                
                <div className="flex items-center gap-4">
                  <button className="btn-primary flex items-center gap-2">
                    <Play size={20} />
                    Начать обучение
                  </button>
                  <p className="text-2xl font-semibold">{courseData.price} ₽</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* What You'll Learn */}
              <div className="glass-card rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-semibold mb-6">Чему вы научитесь</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseData.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ChevronRight size={20} className="text-primary mt-1" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Course Content */}
              <div className="glass-card rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Содержание курса</h2>
                <div className="space-y-4">
                  {courseData.modules.map((module, moduleIndex) => (
                    <div
                      key={moduleIndex}
                      className="border border-white/10 rounded-lg overflow-hidden"
                    >
                      <button
                        className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-card-hover transition-colors"
                        onClick={() => setSelectedModule(moduleIndex === selectedModule ? -1 : moduleIndex)}
                      >
                        <h3 className="font-medium">{module.title}</h3>
                        <ChevronRight
                          size={20}
                          className={`transition-transform ${
                            moduleIndex === selectedModule ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      
                      {moduleIndex === selectedModule && (
                        <div className="px-6 py-4 space-y-3 bg-card/50">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                            >
                              <Play size={16} />
                              <p>{lesson}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="glass-card rounded-xl p-6 mb-6">
                  <h3 className="font-semibold mb-4">Об авторе</h3>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                      alt={courseData.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{courseData.author}</p>
                      <p className="text-sm text-gray-400">Senior JavaScript Developer</p>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Включено в курс</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <Play size={16} />
                      <p>45 часов видео</p>
                    </li>
                    <li className="flex items-center gap-3">
                      <ChevronRight size={16} />
                      <p>72 практических задания</p>
                    </li>
                    <li className="flex items-center gap-3">
                      <ChevronRight size={16} />
                      <p>Доступ навсегда</p>
                    </li>
                    <li className="flex items-center gap-3">
                      <ChevronRight size={16} />
                      <p>Сертификат об окончании</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetails;
