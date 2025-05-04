import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import CreatureCard from '@/components/CreatureCard';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import { Pokemon } from '@/types/pokemon';
import Footer from '@/components/Footer';

// 從 API 獲取寶可夢數據
async function getPokemonPageData(page: number) {
  try {
    // 修復 URL 解析問題，使用絕對 URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                   (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    
    const res = await fetch(`${baseUrl}/api/pokemon/page?page=${page}`, {
      // 不緩存數據，確保每次都是最新的
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('加載寶可夢數據失敗');
    }
    
    return res.json();
  } catch (error) {
    console.error('獲取寶可夢數據時出錯:', error);
    throw error;
  }
}

// 根據寶可夢類型獲取背景顏色
function getTypeBackgroundColor(types: string[]) {
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
}

// 寶可夢列表組件
function PokemonList({ pokemonList, currentPage, totalPages }: { 
  pokemonList: Pokemon[],
  currentPage: number,
  totalPages: number
}) {
  return (
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
        baseUrl="/pokemon"
      />
    </>
  );
}

// 錯誤顯示組件
function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
      <p>{message}</p>
      <Link 
        href="/pokemon"
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 inline-block"
      >
        返回主頁
      </Link>
    </div>
  );
}

// 主頁面組件 - 使用 server component
export default async function PokemonPage({
  searchParams
}: {
  searchParams: { page?: string }
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  
  try {
    // 獲取寶可夢數據
    const { pokemonList, totalPages } = await getPokemonPageData(currentPage);
    
    if (!pokemonList || pokemonList.length === 0) {
      return <ErrorDisplay message="無法獲取寶可夢數據" />;
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            寶可夢圖鑑
          </h1>
          
          <Suspense fallback={<Loading />}>
            <PokemonList 
              pokemonList={pokemonList} 
              currentPage={currentPage} 
              totalPages={totalPages} 
            />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('渲染寶可夢頁面時出錯:', error);
    return <ErrorDisplay message="加載寶可夢數據時出錯" />;
  }
} 