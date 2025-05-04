'use client';

import Image from 'next/image';
import { cn } from '../utils/classNames';
import { pokemonTypeColorMap, digimonTypeColorMap, digimonLevelColorMap } from '../utils/constants';

interface CreatureCardProps {
  name: string;
  image: string;
  types: string[];
  id?: string | number;
  category?: string;
  className?: string;
  typeColorMap?: 'pokemon' | 'digimon';
}

export default function CreatureCard({ 
  name, 
  image, 
  types, 
  id, 
  category,
  className,
  typeColorMap = 'pokemon'
}: CreatureCardProps) {
  // 根據傳入的參數選擇合適的顏色映射
  const getColorClass = (type: string) => {
    if (!type) return 'bg-gray-300';
    
    const lowerType = type.toLowerCase();
    
    if (typeColorMap === 'digimon') {
      // 檢查是否是屬性
      if (['vaccine', 'virus', 'data', 'free', 'unknown'].includes(lowerType)) {
        return digimonTypeColorMap[lowerType] || 'bg-gray-300';
      }
      
      // 檢查是否是等級
      if (['rookie', 'champion', 'ultimate', 'mega', 'armor', 'training', 
          'in-training', 'fresh', 'ultra', 'hybrid'].includes(lowerType)) {
        return digimonLevelColorMap[lowerType] || 'bg-gray-300';
      }
      
      // 如果不是已知的屬性或等級，使用灰色
      return 'bg-gray-300';
    }
    
    // 寶可夢類型顏色
    return pokemonTypeColorMap[lowerType] || 'bg-gray-300';
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
            className={cn("px-2 py-1 rounded-full text-xs font-medium", getColorClass(type), "text-white")}
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