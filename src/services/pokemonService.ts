import { Pokemon, PokemonListResponse } from '../types';
import { createApiClient } from './httpClient';
import { ITEMS_PER_PAGE } from '../utils/constants';

// 從環境變量獲取基礎URL
const POKEMON_API_URL = process.env.NEXT_PUBLIC_POKEMON_API_URL || 'https://pokeapi.co/api/v2';

// 創建 Pokemon API 客戶端
const pokemonClient = createApiClient(POKEMON_API_URL);

// 獲取寶可夢列表
export async function getPokemonList(offset = 0, limit = ITEMS_PER_PAGE): Promise<PokemonListResponse> {
  const response = await pokemonClient.get<PokemonListResponse>(
    `/pokemon?offset=${offset}&limit=${limit}`
  );

  if (!response.ok || !response.data) {
    console.error('獲取寶可夢列表失敗:', response.error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
  }

  return response.data;
}

// 獲取單個寶可夢詳情
export async function getPokemonDetail(idOrName: string | number): Promise<Pokemon | null> {
  const response = await pokemonClient.get<Pokemon>(`/pokemon/${idOrName}`);

  if (!response.ok || !response.data) {
    console.error(`獲取寶可夢詳情失敗 (${idOrName}):`, response.error);
    return null;
  }

  return response.data;
}

// 獲取多個寶可夢詳情
export async function getPokemonDetails(urls: string[]): Promise<Pokemon[]> {
  try {
    // 提取ID或名稱從URL
    const endpoints = urls.map(url => {
      const urlParts = url.split('/');
      return `/pokemon/${urlParts[urlParts.length - 2]}`;
    });
    
    const promises = endpoints.map(endpoint => pokemonClient.get<Pokemon>(endpoint));
    const responses = await Promise.all(promises);
    
    // 過濾出成功的響應並返回數據
    return responses
      .filter(response => response.ok && response.data)
      .map(response => response.data!)
      .filter((data): data is Pokemon => data !== undefined);
  } catch (error) {
    console.error('獲取寶可夢詳情列表時出錯:', error);
    return [];
  }
}

// 搜索寶可夢
export async function searchPokemon(query: string): Promise<Pokemon[]> {
  query = query.toLowerCase().trim();
  
  // 先嘗試直接按ID或名稱獲取
  try {
    const pokemonDetail = await getPokemonDetail(query);
    if (pokemonDetail) {
      return [pokemonDetail];
    }
  } catch {
    // 如果直接獲取失敗，繼續使用列表搜索
    console.log('直接獲取寶可夢失敗，嘗試列表搜索');
  }
  
  // 獲取寶可夢列表（限制數量以提高性能）
  const listResponse = await getPokemonList(0, 100);
  
  // 過濾出匹配的寶可夢
  const matchedResults = listResponse.results.filter(
    pokemon => pokemon.name.toLowerCase().includes(query)
  );
  
  // 獲取匹配寶可夢的詳情
  if (matchedResults.length > 0) {
    const pokemonDetails = await getPokemonDetails(matchedResults.map(r => r.url));
    return pokemonDetails;
  }
  
  return [];
} 