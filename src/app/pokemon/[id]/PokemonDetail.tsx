'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { getPokemonDetail } from '@/services/pokemonService';
import { Pokemon } from '@/types';

// 類型顏色映射
const typeColorMap: Record<string, { bg: string; border: string; text: string }> = {
  normal: { bg: 'bg-gray-300', border: 'border-gray-400', text: 'text-gray-800' },
  fire: { bg: 'bg-red-400', border: 'border-red-500', text: 'text-white' },
  water: { bg: 'bg-blue-400', border: 'border-blue-500', text: 'text-white' },
  electric: { bg: 'bg-yellow-300', border: 'border-yellow-400', text: 'text-gray-800' },
  grass: { bg: 'bg-green-400', border: 'border-green-500', text: 'text-white' },
  ice: { bg: 'bg-blue-200', border: 'border-blue-300', text: 'text-blue-800' },
  fighting: { bg: 'bg-red-600', border: 'border-red-700', text: 'text-white' },
  poison: { bg: 'bg-purple-400', border: 'border-purple-500', text: 'text-white' },
  ground: { bg: 'bg-yellow-600', border: 'border-yellow-700', text: 'text-white' },
  flying: { bg: 'bg-indigo-300', border: 'border-indigo-400', text: 'text-indigo-900' },
  psychic: { bg: 'bg-pink-400', border: 'border-pink-500', text: 'text-white' },
  bug: { bg: 'bg-green-400', border: 'border-green-500', text: 'text-white' },
  rock: { bg: 'bg-yellow-700', border: 'border-yellow-800', text: 'text-white' },
  ghost: { bg: 'bg-purple-600', border: 'border-purple-700', text: 'text-white' },
  dragon: { bg: 'bg-indigo-600', border: 'border-indigo-700', text: 'text-white' },
  dark: { bg: 'bg-gray-700', border: 'border-gray-800', text: 'text-white' },
  steel: { bg: 'bg-gray-400', border: 'border-gray-500', text: 'text-white' },
  fairy: { bg: 'bg-pink-300', border: 'border-pink-400', text: 'text-pink-900' }
};

// 定義組件 Props 類型
interface PokemonDetailProps {
  id: string;
}

export default function PokemonDetail({ id }: PokemonDetailProps) {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonDetail(id);
        setPokemon(data);
      } catch (err) {
        console.error('獲取寶可夢詳情時出錯:', err);
        setError('無法加載寶可夢詳情。請稍後再試。');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPokemonDetail();
  }, [id]);
  
  const goBack = () => {
    router.back();
  };
  
  // 獲取圖片URL
  const getImageUrl = (pokemon: Pokemon) => {
    return pokemon.sprites.other?.['official-artwork']?.front_default || 
      pokemon.sprites.front_default;
  };
  
  // 格式化寶可夢屬性
  const formatStat = (statName: string) => {
    const statMap: Record<string, string> = {
      'hp': 'HP',
      'attack': '攻擊',
      'defense': '防禦',
      'special-attack': '特攻',
      'special-defense': '特防',
      'speed': '速度'
    };
    
    return statMap[statName] || statName;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={goBack} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              返回
            </button>
          </div>
        ) : pokemon ? (
          <div>
            <button 
              onClick={goBack}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              返回列表
            </button>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                    <div className="relative w-64 h-64">
                      {getImageUrl(pokemon) ? (
                        <Image
                          src={getImageUrl(pokemon)!}
                          alt={pokemon.name}
                          fill
                          style={{ objectFit: 'contain' }}
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
                          <span className="text-gray-500">無圖片</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-8">
                    <div className="flex items-end mb-4">
                      <h1 className="text-3xl font-bold capitalize text-gray-800 mr-3">
                        {pokemon.name}
                      </h1>
                      <span className="text-xl text-gray-500">
                        #{pokemon.id.toString().padStart(3, '0')}
                      </span>
                    </div>
                    
                    <div className="mb-6 flex flex-wrap gap-2">
                      {pokemon.types.map((typeInfo, index) => {
                        const type = typeInfo.type.name;
                        const colors = typeColorMap[type] || { 
                          bg: 'bg-gray-300', 
                          border: 'border-gray-400', 
                          text: 'text-gray-800' 
                        };
                        
                        return (
                          <span 
                            key={index}
                            className={`type-badge ${colors.bg} ${colors.border} ${colors.text} border`}
                          >
                            {type}
                          </span>
                        );
                      })}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">身高與重量</h2>
                        <p className="text-gray-600 mb-1">身高: {pokemon.height / 10} 公尺</p>
                        <p className="text-gray-600">重量: {pokemon.weight / 10} 公斤</p>
                      </div>
                      
                      <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">特性</h2>
                        <ul className="list-disc list-inside text-gray-600">
                          {pokemon.abilities.map((ability, index) => (
                            <li key={index} className="capitalize">{ability.ability.name}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3 text-gray-700">能力</h2>
                      <div className="space-y-3">
                        {pokemon.stats.map((stat, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                {formatStat(stat.stat.name)}
                              </span>
                              <span className="text-sm font-medium text-gray-700">
                                {stat.base_stat}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-500 h-2 rounded-full" 
                                style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-800">未找到寶可夢資料</p>
            <button 
              onClick={goBack} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              返回列表
            </button>
          </div>
        )}
      </main>
    </div>
  );
} 