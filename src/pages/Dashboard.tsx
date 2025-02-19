
import React from 'react';
import Navbar from '../components/Navbar';
import { Star, Clock, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  // Моковые данные для примера
  const userData = {
    name: "Александр Петров",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    progress: {
      coursesCompleted: 3,
      coursesInProgress: 2,
      totalHours: 45,
      certificates: 2
    },
    courses: [
      {
        title: "JavaScript Mastery",
        progress: 75,
        lastLesson: "Асинхронное программирование",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
      },
      {
        title: "React & TypeScript",
        progress: 30,
        lastLesson: "Компоненты и пропсы",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
      }
    ],
    certificates: [
      {
        title: "Web Development",
        date: "Март 2024",
        grade: "95%"
      },
      {
        title: "UI/UX Design",
        date: "Февраль 2024",
        grade: "98%"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Profile section */}
          <div className="glass-card rounded-xl p-8 mb-12">
            <div className="flex items-center gap-6">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-semibold mb-2">{userData.name}</h1>
                <p className="text-gray-400">{userData.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="glass-card rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-primary">
                  {userData.progress.coursesCompleted}
                </p>
                <p className="text-gray-400">Завершено курсов</p>
              </div>
              <div className="glass-card rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-primary">
                  {userData.progress.coursesInProgress}
                </p>
                <p className="text-gray-400">В процессе</p>
              </div>
              <div className="glass-card rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-primary">
                  {userData.progress.totalHours}
                </p>
                <p className="text-gray-400">Часов обучения</p>
              </div>
              <div className="glass-card rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-primary">
                  {userData.progress.certificates}
                </p>
                <p className="text-gray-400">Сертификатов</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current courses */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">Текущие курсы</h2>
              <div className="space-y-6">
                {userData.courses.map((course, index) => (
                  <div key={index} className="glass-card rounded-xl p-6">
                    <div className="flex gap-6">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                        <p className="text-gray-400 mb-4">
                          Последний урок: {course.lastLesson}
                        </p>
                        <div className="relative w-full h-2 bg-card rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-primary rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          Прогресс: {course.progress}%
                        </p>
                      </div>
                      <button className="btn-primary self-center">
                        Продолжить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Certificates */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Сертификаты</h2>
              <div className="space-y-4">
                {userData.certificates.map((cert, index) => (
                  <div key={index} className="glass-card rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{cert.title}</h3>
                      <span className="text-primary">{cert.grade}</span>
                    </div>
                    <p className="text-sm text-gray-400">{cert.date}</p>
                    <button className="w-full btn-secondary mt-4">
                      Скачать PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
