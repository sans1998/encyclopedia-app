'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loading } from '@/components';
import Header from '@/components/navigation/Header';
import { getPokemonDetail } from '@/services/pokemonService';
import { Pokemon } from '@/types';
import {
  pokemonTypeDetailColorMap,
  errorMessages,
  cssClasses,
  pokemonStatNameMap
} from '@/utils/constants';

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
        setError(errorMessages.POKEMON_DETAIL_ERROR);
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
    return pokemonStatNameMap[statName] || statName;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className={cssClasses.errorBox}>
            <p>{error}</p>
            <button 
              onClick={goBack} 
              className={cssClasses.detailReturnButton}
            >
              返回
            </button>
          </div>
        ) : pokemon ? (
          <div>
            <button 
              onClick={goBack}
              className={cssClasses.backButton}
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
                        <div className={cssClasses.noImageContainer}>
                          <span className={cssClasses.noImageText}>無圖片</span>
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
                        const colors = pokemonTypeDetailColorMap[type] || { 
                          bg: 'bg-gray-300', 
                          border: 'border-gray-400', 
                          text: 'text-gray-800' 
                        };
                        
                        return (
                          <span 
                            key={index}
                            className={`${cssClasses.typeBadgeDetail} ${colors.bg} ${colors.border} ${colors.text} border`}
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
            <p className="text-gray-800">{errorMessages.NO_POKEMON_FOUND}</p>
            <button 
              onClick={goBack} 
              className={cssClasses.detailReturnButton}
            >
              返回列表
            </button>
          </div>
        )}
      </main>
    </div>
  );
} 