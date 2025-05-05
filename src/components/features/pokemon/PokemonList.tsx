'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {Pagination,Loading} from '@/components';
import { Pokemon } from '@/types/pokemon';
import { 
  pokemonTypeGradients, 
  cssClasses,
  gridConfig
} from '@/utils/constants';

// 根據寶可夢類型獲取背景顏色
function getTypeBackgroundColor(types: string[]) {
  if (!types || types.length === 0) return '';
  
  const primaryType = types[0].toLowerCase();
  return pokemonTypeGradients[primaryType] || '';
}

interface PokemonListProps {
  initialData: {
    pokemonList: Pokemon[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
  };
  initialPage: number;
}

export default function PokemonList({ initialData, initialPage }: PokemonListProps) {
  // 使用初始數據初始化狀態
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // 頁面變化處理函數
  async function handlePageChange(page: number) {
    if (page === data.currentPage) return;
    
    setLoading(true);
    // 更新URL (這會觸發頁面重新獲取，但不會刷新整個頁面)
    router.push(`${pathname}?page=${page}`);
    
    try {
      // 客戶端獲取新頁面數據
      const response = await fetch(`/api/pokemon/page?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error('頁面加載出錯:', error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="relative">
      {/* 加載中指示器 */}
      {loading && (
        <div className={cssClasses.loadingOverlay}>
          <Loading />
        </div>
      )}
      
      <div className={gridConfig.default}>
        {data.pokemonList.map((pokemon: Pokemon) => {
          // 獲取寶可夢類型
          const types = pokemon.types.map((t: { type: { name: string } }) => t.type.name);
          const typeBackground = getTypeBackgroundColor(types);
          
          // 獲取圖片URL
          const imageUrl = pokemon.sprites.front_default || '';
          
          return (
            <Link 
              key={pokemon.id} 
              href={`/pokemon/${pokemon.id}`}
              className={cssClasses.cardHover}
            >
              <div 
                className={`rounded-lg p-4 shadow-md bg-gradient-to-br ${typeBackground}`}
              >
                <div className="text-center">
                  {imageUrl && <img src={imageUrl} alt={pokemon.name} className="mx-auto w-24 h-24" />}
                  <p className="font-semibold">{pokemon.name}</p>
                  <p className="text-sm text-gray-600">ID: {pokemon.id}</p>
                  <div className="flex flex-wrap justify-center gap-1 mt-1">
                    {types.map(type => (
                      <span 
                        key={type}
                        className={cssClasses.typeBadge}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <Pagination 
        currentPage={parseInt(initialPage.toString())}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
} 