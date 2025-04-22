import { Digimon, DigimonListResponse, DigimonType, DigimonLevel, DigimonAttribute, DigimonField, RawDigimonData } from '../types';
import { createApiClient } from './httpClient';

// 從環境變量獲取基礎URL
const DIGIMON_API_URL = process.env.NEXT_PUBLIC_DIGIMON_API_URL || 'https://digimon-api.vercel.app/api';
const DEFAULT_PAGE_SIZE = Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE) || 20;

// 創建 Digimon API 客戶端
const digimonClient = createApiClient(DIGIMON_API_URL);

// 處理不規範的API響應
function normalizeDigimonData(data: RawDigimonData): Digimon {
  return {
    id: data.id || 0,
    name: data.name || '',
    images: Array.isArray(data.images) ? data.images : [],
    types: Array.isArray(data.types) ? data.types.map((t: DigimonType) => ({
      id: t.id || 0,
      type: t.type || 'unknown'
    })) : [],
    levels: Array.isArray(data.levels) ? data.levels.map((l: DigimonLevel) => ({
      id: l.id || 0,
      level: l.level || 'unknown'
    })) : [],
    attributes: Array.isArray(data.attributes) ? data.attributes.map((a: DigimonAttribute) => ({
      id: a.id || 0,
      attribute: a.attribute || 'unknown'
    })) : [],
    fields: Array.isArray(data.fields) ? data.fields.map((f: DigimonField) => ({
      id: f.id || 0,
      field: f.field || 'unknown',
      image: f.image || ''
    })) : [],
    descriptions: Array.isArray(data.descriptions) ? data.descriptions : []
  };
}

// 獲取數碼寶貝列表
export async function getDigimonList(page = 0, pageSize = DEFAULT_PAGE_SIZE): Promise<DigimonListResponse> {
  const response = await digimonClient.get<RawDigimonData[]>(
    `/digimon?page=${page}&pageSize=${pageSize}`
  );

  if (!response.ok || !response.data) {
    console.error('獲取數碼寶貝列表失敗:', response.error);
    return {
      content: [],
      pageable: {
        currentPage: 0,
        elementsOnPage: 0,
        totalElements: 0,
        totalPages: 1,
        previousPage: null,
        nextPage: null
      }
    };
  }

  try {
    const data = response.data;
    return {
      content: Array.isArray(data) 
        ? data.map(digimon => normalizeDigimonData(digimon))
        : [],
      pageable: {
        currentPage: page,
        elementsOnPage: data.length,
        totalElements: data.length,
        totalPages: Math.ceil(data.length / pageSize),
        previousPage: page > 0 ? `/digimon?page=${page - 1}&pageSize=${pageSize}` : null,
        nextPage: `/digimon?page=${page + 1}&pageSize=${pageSize}`
      }
    };
  } catch (error) {
    console.error('處理數碼寶貝列表數據時出錯:', error);
    return {
      content: [],
      pageable: {
        currentPage: 0,
        elementsOnPage: 0,
        totalElements: 0,
        totalPages: 1,
        previousPage: null,
        nextPage: null
      }
    };
  }
}

// 獲取單個數碼寶貝詳情
export async function getDigimonDetail(id: string | number): Promise<Digimon | null> {
  const response = await digimonClient.get<RawDigimonData>(`/digimon/${id}`);

  if (!response.ok || !response.data) {
    console.error(`獲取數碼寶貝詳情失敗 (${id}):`, response.error);
    return null;
  }

  try {
    return normalizeDigimonData(response.data);
  } catch (error) {
    console.error(`處理數碼寶貝詳情數據時出錯 (${id}):`, error);
    return null;
  }
}

// 搜索數碼寶貝
export async function searchDigimon(query: string): Promise<Digimon[]> {
  query = query.toLowerCase().trim();
  
  // 先嘗試直接按ID或名稱獲取
  try {
    const digimonDetail = await getDigimonDetail(query);
    if (digimonDetail) {
      return [digimonDetail];
    }
  } catch {
    // 如果直接獲取失敗，繼續使用列表搜索
    console.log('直接獲取數碼寶貝失敗，嘗試列表搜索');
  }
  
  // 獲取數碼寶貝列表
  const listResponse = await getDigimonList(0, 200);
  
  // 過濾出匹配的數碼寶貝
  const matchedDigimon = listResponse.content.filter(
    digimon => digimon.name.toLowerCase().includes(query)
  );
  
  return matchedDigimon;
} 