
import React from 'react';
import { Star, Clock, Users } from 'lucide-react';
import { Course } from '../types/database';

interface CourseCardProps extends Course {
  onClick?: () => void;
}

const CourseCard = ({
  title,
  author,
  rating,
  students_count,
  duration,
  price,
  image,
  onClick
}: CourseCardProps) => {
  return (
    <div 
      className="card-hover glass-card rounded-xl overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{author}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400" />
            {rating}
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            {students_count}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            {duration}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">{price} ₽</p>
          <button className="btn-primary py-2">Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

