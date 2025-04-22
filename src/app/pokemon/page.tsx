'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import CreatureCard from '@/components/CreatureCard';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import { getPokemonList, getPokemonDetail } from '@/services/pokemonService';
import type { Pokemon } from '@/types/pokemon';
import Footer from '@/components/Footer';

// 分離出使用 useSearchParams 的組件
function PokemonList() {
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
          (pokemon: { name: string }) => getPokemonDetail(pokemon.name)
        );
        
        const detailedPokemonResults = await Promise.all(detailedPokemonPromises);
        // 過濾掉null值
        const validPokemon = detailedPokemonResults.filter((pokemon: Pokemon | null): pokemon is Pokemon => pokemon !== null);
        setPokemonList(validPokemon);
      } catch (err) {
        console.error('獲取寶可夢數據時出錯:', err);
        setError('無法加載寶可夢數據。請稍後再試。');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPokemon();
  }, [currentPage]);

  // 根據寶可夢類型獲取背景顏色
  const getTypeBackgroundColor = (types: string[]) => {
    if (!types || types.length === 0) return '';
    
    const primaryType = types[0].toLowerCase();
    const typeColors: Record<string, string> = {
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
    
    return typeColors[primaryType] || '';
  };

  return (
    <>
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
            {pokemonList.map((pokemon: Pokemon) => {
              const types = pokemon.types.map((t: { type: { name: string } }) => t.type.name);
              const typeBackground = getTypeBackgroundColor(types);
              
              return (
                <Link 
                  key={pokemon.id} 
                  href={`/pokemon/${pokemon.id}`}
                  className="block transform transition hover:scale-105"
                >
                  <CreatureCard 
                    name={pokemon.name}
                    image={pokemon.sprites.front_default || ''}
                    types={types}
                    id={pokemon.id}
                    category="寶可夢"
                    className={`bg-gradient-to-br ${typeBackground}`}
                  />
                </Link>
              );
            })}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}

// 主頁面組件
export default function PokemonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          寶可夢圖鑑
        </h1>
        
        <Suspense fallback={<Loading />}>
          <PokemonList />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
} 