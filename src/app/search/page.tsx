'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layouts/Header';
import CreatureCard from '@/components/ui/CreatureCard';
import SearchBar from '@/components/ui/SearchBar';
import Loading from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import { searchPokemon } from '@/services/pokemonService';
import { searchDigimon } from '@/services/digimonService';

interface SearchResult {
  id: string;
  name: string;
  image: string;
  types: string[];
  category: 'pokemon' | 'digimon';
}

// 分離出使用 useSearchParams 的組件
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const resultsPerPage = 12;

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      
      try {
        // 搜索寶可夢和數碼寶貝
        const [pokemonResults, digimonResults] = await Promise.all([
          searchPokemon(query),
          searchDigimon(query)
        ]);
        
        // 合併和格式化結果
        const formattedResults: SearchResult[] = [
          ...pokemonResults.map(p => ({
            id: p.id.toString(),
            name: p.name,
            image: p.sprites.front_default,
            types: p.types.map((t: { type: { name: string } }) => t.type.name),
            category: 'pokemon' as const
          })),
          ...digimonResults.map(d => ({
            id: d.id.toString(),
            name: d.name,
            image: d.images[0]?.href || '',
            types: d.levels.map((l: { level: string }) => l.level),
            category: 'digimon' as const
          }))
        ];
        
        setResults(formattedResults);
      } catch (error) {
        console.error('搜索錯誤:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [query]);
  
  const paginatedResults = results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  // 根據類型獲取背景顏色
  const getBackgroundColor = (item: SearchResult) => {
    if (item.category === 'pokemon') {
      // 寶可夢類型顏色
      const typeColorMap: Record<string, string> = {
        normal: 'from-gray-200 to-gray-300',
        fire: 'from-red-200 to-orange-300',
        water: 'from-blue-200 to-blue-300',
        electric: 'from-yellow-100 to-yellow-300',
        grass: 'from-green-200 to-green-300',
        ice: 'from-blue-100 to-cyan-200',
        fighting: 'from-red-300 to-red-400',
        poison: 'from-purple-200 to-purple-300',
        ground: 'from-yellow-200 to-yellow-400',
        flying: 'from-indigo-100 to-blue-200',
        psychic: 'from-pink-200 to-pink-300',
        bug: 'from-lime-200 to-green-200',
        rock: 'from-yellow-300 to-yellow-500',
        ghost: 'from-purple-300 to-indigo-400',
        dragon: 'from-indigo-300 to-blue-400',
        dark: 'from-gray-600 to-gray-700',
        steel: 'from-gray-300 to-gray-400',
        fairy: 'from-pink-100 to-pink-200'
      };
      
      if (item.types && item.types.length > 0) {
        const primaryType = item.types[0].toLowerCase();
        return typeColorMap[primaryType] || 'from-gray-100 to-gray-200';
      }
    } else {
      // 數碼寶貝類型顏色
      return 'from-blue-100 to-blue-200';
    }
    
    return 'from-gray-100 to-gray-200';
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">搜索結果: {query}</h1>
      
      {/* 搜索欄 */}
      <div className="mb-8">
        <SearchBar initialValue={query} />
      </div>
      
      {loading ? (
        <Loading text="搜索中..." />
      ) : (
        <>
          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                沒有找到與 &quot;{query}&quot; 相關的結果
              </p>
              <p className="text-gray-500">
                請嘗試其他關鍵詞或查看我們的
                <Link href="/pokemon" className="text-blue-500 hover:underline mx-1">
                  寶可夢
                </Link>
                或
                <Link href="/digimon" className="text-blue-500 hover:underline mx-1">
                  數碼寶貝
                </Link>
                完整目錄
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4">
                找到 {results.length} 個結果
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedResults.map((item) => {
                  const backgroundGradient = getBackgroundColor(item);
                  
                  return (
                    <CreatureCard
                      key={`${item.category}-${item.id}`}
                      name={item.name}
                      image={item.image}
                      tags={item.types.map(type => (
                        <span key={type} className="inline-block px-2 py-1 text-xs rounded bg-opacity-50 bg-blue-100 text-blue-800 mr-1 mb-1">
                          {type}
                        </span>
                      ))}
                      id={item.id}
                      backgroundGradient={backgroundGradient}
                      href={`/${item.category}/${item.id}`}
                    />
                  );
                })}
              </div>
              
              {/* 分頁 */}
              {results.length > resultsPerPage && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(results.length / resultsPerPage)}
                    baseUrl={`/search?q=${encodeURIComponent(query)}`}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

// 主頁面組件
const SearchPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loading text="載入中..." />}>
          <SearchResults />
        </Suspense>
      </main>
    </div>
  );
};

export default SearchPage; 