import { Suspense } from 'react';
import Link from 'next/link';
import { Loading } from '@/components';
import { PokemonList } from '@/components';
import { errorMessages, cssClasses, encyclopediaPathMap, encyclopediaTypes } from '@/utils/constants';

// 從 API 獲取寶可夢數據
async function getPokemonPageData(page: number) {
  try {
    // 直接使用環境變數獲取基礎URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
    const res = await fetch(`${baseUrl}/api/pokemon/page?page=${page}`);
    
    if (!res.ok) {
      throw new Error(errorMessages.LOAD_POKEMON_FAILED);
    }
    
    return res.json();
  } catch (error) {
    console.error('獲取寶可夢數據時出錯:', error);
    throw error;
  }
}

// 錯誤顯示組件
function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className={cssClasses.errorBox}>
      <p>{message}</p>
      <Link 
        href={encyclopediaPathMap[encyclopediaTypes.POKEMON]}
        className={cssClasses.returnButton}
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
  searchParams: Promise<{ page?: string }>
}) {
  const { page = '1' } = await searchParams;
  const currentPage = parseInt(page);
  
  try {
    // 獲取寶可夢數據
    const initialData = await getPokemonPageData(currentPage);
    
    if (!initialData.pokemonList || initialData.pokemonList.length === 0) {
      return <ErrorDisplay message={errorMessages.NO_POKEMON_DATA} />;
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          寶可夢圖鑑
        </h1>
        
        <Suspense fallback={<Loading />}>
          <PokemonList 
            initialData={initialData} 
            initialPage={currentPage} 
          />
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error('渲染寶可夢頁面時出錯:', error);
    return <ErrorDisplay message={errorMessages.LOAD_POKEMON_FAILED} />;
  }
} 