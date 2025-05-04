import { NextRequest, NextResponse } from 'next/server';
import { getPokemonList, getPokemonDetail } from '@/services/pokemonService';
import { Pokemon } from '@/types/pokemon';
import { ITEMS_PER_PAGE } from '@/utils/constants';

// 定義返回數據格式
interface PokemonPageResponse {
  pokemonList: Pokemon[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export async function GET(request: NextRequest) {
  // 從查詢參數獲取頁碼
  const searchParams = request.nextUrl.searchParams;
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  
  try {
    // 計算偏移量
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    
    // 獲取寶可夢列表
    const listResponse = await getPokemonList(offset, ITEMS_PER_PAGE);
    
    // 計算總頁數
    const totalPages = Math.ceil(listResponse.count / ITEMS_PER_PAGE);
    
    // 並行獲取每個寶可夢的詳細信息
    const detailedPokemonPromises = listResponse.results.map(
      (pokemon: { name: string }) => getPokemonDetail(pokemon.name)
    );
    
    const detailedPokemonResults = await Promise.all(detailedPokemonPromises);
    // 過濾掉null值
    const validPokemon = detailedPokemonResults.filter((pokemon: Pokemon | null): pokemon is Pokemon => pokemon !== null);
    
    // 返回完整數據
    const response: PokemonPageResponse = {
      pokemonList: validPokemon,
      totalPages,
      currentPage,
      totalItems: listResponse.count
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('獲取寶可夢數據時出錯:', error);
    return NextResponse.json(
      { error: '無法加載寶可夢數據。請稍後再試。' },
      { status: 500 }
    );
  }
} 