import { Pokemon, Digimon, SimpleDigimon } from '../types';
import { getPokemonList, getPokemonDetail, searchPokemon } from './pokemonService';
import { getDigimonList, getDigimonDetail, searchDigimon } from './digimonService';
import { encyclopediaTypes, ITEMS_PER_PAGE } from '../utils/constants';

// 定義實體內容類型
export type EntityContent = Pokemon | Digimon | SimpleDigimon | {name: string; url: string};

// 統一的響應類型
export interface EntityListResponse {
  content: EntityContent[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// 根據百科全書類型獲取實體列表
export async function getEntitiesByType(type: string, page = 0, pageSize = ITEMS_PER_PAGE): Promise<EntityListResponse> {
  switch (type) {
    case encyclopediaTypes.POKEMON:
      return getPokemonEntities(page, pageSize);
    case encyclopediaTypes.DIGIMON:
      return getDigimonEntities(page, pageSize);
    default:
      throw new Error(`不支持的百科全書類型: ${type}`);
  }
}

// 根據百科全書類型獲取單個實體
export async function getEntityByType(type: string, idOrName: string | number): Promise<Pokemon | Digimon | null> {
  switch (type) {
    case encyclopediaTypes.POKEMON:
      return getPokemonDetail(idOrName);
    case encyclopediaTypes.DIGIMON:
      return getDigimonDetail(idOrName);
    default:
      throw new Error(`不支持的百科全書類型: ${type}`);
  }
}

// 根據百科全書類型搜索實體
export async function searchEntityByType(type: string, query: string): Promise<(Pokemon | Digimon)[]> {
  switch (type) {
    case encyclopediaTypes.POKEMON:
      return searchPokemon(query);
    case encyclopediaTypes.DIGIMON:
      return searchDigimon(query);
    default:
      throw new Error(`不支持的百科全書類型: ${type}`);
  }
}

// 處理寶可夢數據
async function getPokemonEntities(page: number, pageSize: number): Promise<EntityListResponse> {
  const offset = page * pageSize;
  const pokemonList = await getPokemonList(offset, pageSize);
  
  return {
    content: pokemonList.results,
    pagination: {
      currentPage: page,
      pageSize: pageSize,
      totalItems: pokemonList.count,
      totalPages: Math.ceil(pokemonList.count / pageSize),
      hasNextPage: !!pokemonList.next,
      hasPrevPage: !!pokemonList.previous
    }
  };
}

// 處理數碼寶貝數據
async function getDigimonEntities(page: number, pageSize: number): Promise<EntityListResponse> {
  const digimonList = await getDigimonList(page, pageSize);
  
  return {
    content: digimonList.content,
    pagination: {
      currentPage: digimonList.pageable.currentPage,
      pageSize: digimonList.pageable.elementsOnPage,
      totalItems: digimonList.pageable.totalElements,
      totalPages: digimonList.pageable.totalPages,
      hasNextPage: !!digimonList.pageable.nextPage,
      hasPrevPage: !!digimonList.pageable.previousPage
    }
  };
} 