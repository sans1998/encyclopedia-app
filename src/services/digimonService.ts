import { Digimon, DigimonListResponse, DigimonType, DigimonLevel, DigimonAttribute, DigimonField, RawDigimonData, SimpleDigimon } from '../types';
import { createApiClient } from './httpClient';
import { ITEMS_PER_PAGE } from '../utils/constants';

// 從環境變量獲取基礎URL
const DIGIMON_API_URL = process.env.NEXT_PUBLIC_DIGIMON_API_URL || 'https://digi-api.com/api/v1';

// API響應結構
interface ApiListResponse {
  content: SimpleDigimon[];
  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
    previousPage: string | null;
    nextPage: string | null;
  };
}

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

// 擴展的SimpleDigimon類型，包含基本屬性和等級信息
export interface EnhancedDigimonListItem {
  id: number;
  name: string;
  image: string;
  href: string;
  primaryAttribute?: string;
  primaryLevel?: string;
  primaryType?: string;
}

// 獲取數碼寶貝列表
export async function getDigimonList(page = 0, pageSize = ITEMS_PER_PAGE): Promise<DigimonListResponse> {
  const response = await digimonClient.get<ApiListResponse>(`/digimon?page=${page}&pageSize=${pageSize}`);

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
    const data = response.data as ApiListResponse;
    
    // 檢查是否為新的API格式（有content屬性的對象）
    if (data.content && Array.isArray(data.content) && data.content.length > 0) {
      // 新API格式，直接使用列表項
      return {
        content: data.content,
        pageable: {
          currentPage: data.pageable?.currentPage || 0,
          elementsOnPage: data.pageable?.elementsOnPage || data.content.length,
          totalElements: data.pageable?.totalElements || 0,
          totalPages: data.pageable?.totalPages || 1,
          previousPage: data.pageable?.previousPage || null,
          nextPage: data.pageable?.nextPage || null
        }
      };
    } else {
      // 舊API格式，處理數組數據
      const arrayData = data as unknown as RawDigimonData[];
      return {
        content: Array.isArray(arrayData) 
          ? arrayData.map(digimon => normalizeDigimonData(digimon))
          : [],
        pageable: {
          currentPage: page,
          elementsOnPage: Array.isArray(arrayData) ? arrayData.length : 0,
          totalElements: Array.isArray(arrayData) ? arrayData.length : 0,
          totalPages: Math.ceil((Array.isArray(arrayData) ? arrayData.length : 0) / pageSize),
          previousPage: page > 0 ? `/digimon?page=${page - 1}&pageSize=${pageSize}` : null,
          nextPage: `/digimon?page=${page + 1}&pageSize=${pageSize}`
        }
      };
    }
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
  
  // 嘗試使用API的搜索端點
  try {
    const response = await digimonClient.get<ApiListResponse>(`/digimon?name=${encodeURIComponent(query)}`);
    if (response.ok && response.data && response.data.content) {
      // 獲取簡單列表中找到的數碼寶貝的詳細信息
      const details = await Promise.all(
        response.data.content.map((item: SimpleDigimon) => getDigimonDetail(item.id))
      );
      // 過濾掉null值
      return details.filter((d): d is Digimon => d !== null);
    }
  } catch (error) {
    console.error('API搜索數碼寶貝失敗:', error);
  }
  
  // 如果API搜索失敗，回退到獲取完整列表並過濾
  console.log('API搜索失敗，嘗試獲取完整列表並過濾');
  const listResponse = await getDigimonList(0, 100);
  
  // 過濾出匹配的數碼寶貝
  const matchedItems = listResponse.content.filter(
    digimon => 'name' in digimon && digimon.name.toLowerCase().includes(query)
  );
  
  // 如果是簡化版的數碼寶貝列表項，獲取詳細信息
  const matchedDigimon: Digimon[] = [];
  for (const item of matchedItems) {
    if ('href' in item) {
      // 是SimpleDigimon類型
      const detail = await getDigimonDetail(item.id);
      if (detail) {
        matchedDigimon.push(detail);
      }
    } else {
      // 已經是完整Digimon類型
      matchedDigimon.push(item);
    }
  }
  
  return matchedDigimon;
}

// 獲取增強的數碼寶貝列表
export async function getEnhancedDigimonList(page = 0, pageSize = ITEMS_PER_PAGE): Promise<{
  content: EnhancedDigimonListItem[];
  pageable: DigimonListResponse['pageable'];
}> {
  // 首先獲取常規列表
  const response = await getDigimonList(page, pageSize);
  
  // 對於每個簡單的列表項，獲取其主要屬性和等級
  const enhancedContentPromises = response.content.map(async (item) => {
    if (!('id' in item)) {
      return null; // 跳過無效項
    }
    
    try {
      // 對於SimpleDigimon類型，獲取詳情
      if ('href' in item) {
        const detailResponse = await digimonClient.get<RawDigimonData>(`/digimon/${item.id}`);
        
        if (detailResponse.ok && detailResponse.data) {
          const data = detailResponse.data;
          
          return {
            ...item,
            primaryAttribute: data.attributes && data.attributes.length > 0 ? 
              data.attributes[0].attribute : undefined,
            primaryLevel: data.levels && data.levels.length > 0 ? 
              data.levels[0].level : undefined,
            primaryType: data.types && data.types.length > 0 ? 
              data.types[0].type : undefined
          };
        }
        
        return item; // 返回原始項
      } else {
        // 已經是完整的Digimon對象
        return {
          id: item.id,
          name: item.name,
          image: 'images' in item && item.images.length > 0 ? item.images[0].href : '',
          href: '',
          primaryAttribute: item.attributes && item.attributes.length > 0 ? 
            item.attributes[0].attribute : undefined,
          primaryLevel: item.levels && item.levels.length > 0 ? 
            item.levels[0].level : undefined,
          primaryType: item.types && item.types.length > 0 ? 
            item.types[0].type : undefined
        };
      }
    } catch (error) {
      console.error(`處理數碼寶貝列表項時出錯 (${item.id}):`, error);
      return item; // 返回原始項
    }
  });
  
  // 等待所有Promise完成
  const enhancedContent = (await Promise.all(enhancedContentPromises))
    .filter((item): item is EnhancedDigimonListItem => item !== null);
  
  return {
    content: enhancedContent,
    pageable: response.pageable
  };
} 