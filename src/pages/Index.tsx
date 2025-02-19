
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CourseCard from '../components/CourseCard';
import TestimonialCard from '../components/TestimonialCard';
import Footer from '../components/Footer';

const popularCourses = [
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
  }
];

const testimonials = [
  {
    name: "Анна Смирнова",
    role: "Frontend Developer",
    rating: 5,
    text: "Отличная платформа! Курсы помогли мне сменить профессию и найти работу мечты.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    name: "Михаил Козлов",
    role: "UX Designer",
    rating: 5,
    text: "Структурированный материал и отзывчивые преподаватели. Очень доволен результатом!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  },
  {
    name: "Екатерина Новикова",
    role: "Product Manager",
    rating: 4,
    text: "Профессиональный подход к обучению. Много практики и реальных проектов.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <HeroSection />
      
      {/* Popular Courses */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Популярные курсы</h2>
            <p className="text-gray-400">Выберите курс и начните обучение уже сегодня</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Отзывы студентов</h2>
            <p className="text-gray-400">Что говорят наши выпускники</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
