'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import CreatureCard from '@/components/CreatureCard';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import { getPokemonList, getPokemonDetail } from '@/services/pokemonService';
import { Pokemon } from '@/types';

export default function PokemonPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  const ITEMS_PER_PAGE = 20;
  
  // 處理頁面變更
  const handlePageChange = (page: number) => {
    router.push(`${pathname}?page=${page}`);
  };
  
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 計算偏移量
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        
        // 獲取寶可夢列表
        const listResponse = await getPokemonList(offset, ITEMS_PER_PAGE);
        
        // 計算總頁數
        setTotalPages(Math.ceil(listResponse.count / ITEMS_PER_PAGE));
        
        // 獲取每個寶可夢的詳細信息
        const detailedPokemonPromises = listResponse.results.map(
          pokemon => getPokemonDetail(pokemon.name)
        );
        
        const detailedPokemon = await Promise.all(detailedPokemonPromises);
        setPokemonList(detailedPokemon);
      } catch (err) {
        console.error('獲取寶可夢數據時出錯:', err);
        setError('無法加載寶可夢數據。請稍後再試。');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPokemon();
  }, [currentPage]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          寶可夢圖鑑
        </h1>
        
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={() => handlePageChange(currentPage)} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              重試
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {pokemonList.map(pokemon => (
                <CreatureCard 
                  key={pokemon.id} 
                  data={pokemon}
                  type="pokemon"
                />
              ))}
            </div>
            
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
} 