
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight, MessageCircle, Play } from 'lucide-react';

const Learn = () => {
  const { courseId, lessonId } = useParams();
  const [showSidebar, setShowSidebar] = useState(true);

  // Моковые данные для примера
  const lessonData = {
    title: "Установка необходимого ПО",
    description: "В этом уроке мы настроим все необходимые инструменты для разработки.",
    videoUrl: "https://example.com/video.mp4",
    comments: [
      {
        author: "Анна Смирнова",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        text: "Отличный урок! Все очень понятно объяснено.",
        date: "2 часа назад"
      },
      {
        author: "Михаил Козлов",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        text: "Спасибо за подробное объяснение. Есть вопрос по настройке VS Code...",
        date: "5 часов назад"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-card transform transition-transform duration-300 z-40 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">JavaScript Mastery</h2>
          
          <div className="space-y-4">
            {/* Module */}
            <div className="border border-white/10 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-card-hover">
                <h3 className="font-medium">Введение в JavaScript</h3>
              </div>
              
              <div className="px-4 py-2 space-y-2">
                {["Установка необходимого ПО", "Основы синтаксиса", "Переменные и типы данных"].map((lesson, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm hover:bg-primary/10 ${
                      index === 0 ? "text-primary" : "text-gray-300"
                    }`}
                  >
                    <Play size={16} />
                    {lesson}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className={`flex-1 ${showSidebar ? "ml-80" : "ml-0"}`}>
        {/* Video section */}
        <div className="aspect-video bg-black">
          {/* Video player will go here */}
          <div className="w-full h-full flex items-center justify-center">
            <Play size={48} className="text-white/50" />
          </div>
        </div>
        
        {/* Lesson content */}
        <div className="px-8 py-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">{lessonData.title}</h1>
          <p className="text-gray-300 mb-8">{lessonData.description}</p>
          
          {/* Comments section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Комментарии</h2>
            
            {/* Comment form */}
            <div className="flex gap-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  placeholder="Написать комментарий..."
                  className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg text-gray-300 focus:outline-none focus:border-primary/50"
                  rows={3}
                />
                <button className="btn-primary mt-2">Отправить</button>
              </div>
            </div>
            
            {/* Comments list */}
            <div className="space-y-6">
              {lessonData.comments.map((comment, index) => (
                <div key={index} className="flex gap-4">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{comment.author}</h4>
                      <span className="text-sm text-gray-400">{comment.date}</span>
                    </div>
                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Toggle sidebar button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 left-4 z-50 p-2 bg-card rounded-lg hover:bg-card-hover transition-colors"
      >
        <ChevronRight
          size={24}
          className={`transform transition-transform ${
            showSidebar ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default Learn;
