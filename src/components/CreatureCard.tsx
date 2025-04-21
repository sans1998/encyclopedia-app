import Image from 'next/image';
import Link from 'next/link';
import { Pokemon, Digimon } from '../types';
import { cn } from '../utils/classNames';

interface CreatureCardProps {
  data: Pokemon | Digimon;
  type: 'pokemon' | 'digimon';
}

export default function CreatureCard({ data, type }: CreatureCardProps) {
  // 處理不同類型的數據
  const isPokemon = type === 'pokemon';
  const pokemon = data as Pokemon;
  const digimon = data as Digimon;
  
  // 獲取正確的圖片URL
  const imageUrl = isPokemon 
    ? pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default
    : digimon.images?.[0]?.href;
  
  // 獲取正確的ID和名稱
  const id = data.id || 0;
  const name = data.name || '';
  
  // 獲取類型，確保不為空
  const types = isPokemon 
    ? (pokemon.types?.map(t => t.type.name) || [])
    : (digimon.types?.map(t => t.type) || []);
  
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
    <Link href={`/${type}/${id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col items-center cursor-pointer creature-card">
        <div className="w-32 h-32 relative mb-3 flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
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
        
        <div className="text-gray-500 text-sm mb-2">#{id.toString().padStart(3, '0')}</div>
        
        <div className="flex gap-2 flex-wrap justify-center">
          {types && types.length > 0 ? types.map((type, index) => (
            <span 
              key={index}
              className={cn("type-badge", typeColorMap[type?.toLowerCase?.() || ''] || 'bg-gray-300', "text-white")}
            >
              {type}
            </span>
          )) : (
            <span className="type-badge bg-gray-300 text-white">未知</span>
          )}
        </div>
      </div>
    </Link>
  );
} 