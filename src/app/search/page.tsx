'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CreatureCard from '../../components/CreatureCard';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import { searchPokemon } from '../../services/pokemonService';
import { searchDigimon } from '../../services/digimonService';

interface SearchResult {
  id: string;
  name: string;
  image: string;
  types: string[];
  category: 'pokemon' | 'digimon';
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
            types: p.types.map(t => t.type.name),
            category: 'pokemon' as const
          })),
          ...digimonResults.map(d => ({
            id: d.id.toString(),
            name: d.name,
            image: d.images[0]?.href || '',
            types: d.levels.map(l => l.level),
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
  
  return (
    <div className="container mx-auto px-4 py-8">
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
                {paginatedResults.map((item) => (
                  <Link 
                    key={`${item.category}-${item.id}`}
                    href={`/${item.category}/${item.id}`}
                  >
                    <CreatureCard
                      name={item.name}
                      image={item.image}
                      types={item.types}
                      category={item.category === 'pokemon' ? '寶可夢' : '數碼寶貝'}
                    />
                  </Link>
                ))}
              </div>
              
              {/* 分頁 */}
              {results.length > resultsPerPage && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(results.length / resultsPerPage)}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage; 