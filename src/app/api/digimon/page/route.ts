import { NextRequest, NextResponse } from 'next/server';
import { getEnhancedDigimonList } from '@/services/digimonService';
import { EnhancedDigimonListItem } from '@/services/digimonService';
import { ITEMS_PER_PAGE } from '@/utils/constants';

// 定義返回數據格式
interface DigimonPageResponse {
  digimonList: EnhancedDigimonListItem[];
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
    // 獲取增強的數碼寶貝列表，服務層已經處理了詳情獲取
    const enhancedResponse = await getEnhancedDigimonList(currentPage - 1, ITEMS_PER_PAGE);
    
    // 返回完整數據
    const response: DigimonPageResponse = {
      digimonList: enhancedResponse.content,
      totalPages: enhancedResponse.pageable.totalPages,
      currentPage,
      totalItems: enhancedResponse.pageable.totalElements
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('獲取數碼寶貝數據時出錯:', error);
    return NextResponse.json(
      { error: '無法加載數碼寶貝數據。請稍後再試。' },
      { status: 500 }
    );
  }
} 