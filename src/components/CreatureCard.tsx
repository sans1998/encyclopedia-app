import Image from 'next/image';
import { cn } from '../utils/classNames';

interface CreatureCardProps {
  name: string;
  image: string;
  types: string[];
  id?: string | number;
  category?: string;
  className?: string;
}

export default function CreatureCard({ 
  name, 
  image, 
  types, 
  id, 
  category,
  className 
}: CreatureCardProps) {
  // 處理類型的顏色映射
  const typeColorMap: Record<string, string> = {
    // 寶可夢類型顏色
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-700',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
    // 數碼寶貝類型顏色
    free: 'bg-green-300',
    vaccine: 'bg-blue-300',
    virus: 'bg-red-300',
    data: 'bg-purple-300',
    unknown: 'bg-gray-300',
  };
  
  return (
    <div className={cn("bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col items-center cursor-pointer creature-card", className)}>
      <div className="w-32 h-32 relative mb-3 flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={128}
            height={128}
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, 128px"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
            <span className="text-gray-500">無圖片</span>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-center capitalize mb-1">{name}</h3>
      
      {id && <div className="text-gray-500 text-sm mb-2">#{id.toString().padStart(3, '0')}</div>}
      
      {category && <div className="text-blue-500 text-xs mb-2 uppercase">{category}</div>}
      
      <div className="flex gap-2 flex-wrap justify-center">
        {types && types.length > 0 ? types.map((type, index) => (
          <span 
            key={index}
            className={cn("px-2 py-1 rounded-full text-xs font-medium", typeColorMap[type?.toLowerCase?.() || ''] || 'bg-gray-300', "text-white")}
          >
            {type}
          </span>
        )) : (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-300 text-white">未知</span>
        )}
      </div>
    </div>
  );
} 