
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

const TestimonialCard = ({
  name,
  role,
  rating,
  text,
  avatar
}: TestimonialCardProps) => {
  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in-up">
      <div className="flex items-start gap-4 mb-4">
        <img 
          src={avatar} 
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
      
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-yellow-400" : "text-gray-600"}
            fill={i < rating ? "currentColor" : "none"}
          />
        ))}
      </div>
      
      <p className="text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
};

export default TestimonialCard;
