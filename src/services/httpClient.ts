import { ApiResponse } from '../types';

/**
 * 通用的 HTTP 客戶端工具，用於處理 API 請求
 * @param url - 請求的 URL
 * @param options - fetch API 選項
 * @returns API 響應包裝對象
 */
export async function fetchApi<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);
    
    return {
      ok: response.ok,
      status: response.status,
      data: response.ok ? await response.json() : undefined,
      error: !response.ok ? `API 請求失敗: ${response.status}` : undefined
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : '未知錯誤'
    };
  }
}

/**
 * 創建基於特定 API 基礎 URL 的客戶端
 * @param baseUrl - API 基礎 URL
 * @returns 帶有特定基礎 URL 的 HTTP 客戶端
 */
export function createApiClient(baseUrl: string) {
  // 驗證基礎 URL
  if (!baseUrl) {
    console.error('API URL not configured');
  }
  
  return {
    /**
     * 發送 GET 請求
     * @param endpoint - API 端點路徑（不含基礎 URL）
     * @param options - fetch API 選項
     * @returns API 響應包裝對象
     */
    get: async <T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
      const url = `${baseUrl}${endpoint}`;
      return fetchApi<T>(url, { ...options, method: 'GET' });
    },
    
    /**
     * 發送 POST 請求
     * @param endpoint - API 端點路徑（不含基礎 URL）
     * @param data - 請求體數據
     * @param options - fetch API 選項
     * @returns API 響應包裝對象
     */
    post: async <T, D = Record<string, unknown>>(endpoint: string, data?: D, options?: RequestInit): Promise<ApiResponse<T>> => {
      const url = `${baseUrl}${endpoint}`;
      return fetchApi<T>(url, {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      });
    },
    
    /**
     * 發送 PUT 請求
     * @param endpoint - API 端點路徑（不含基礎 URL）
     * @param data - 請求體數據
     * @param options - fetch API 選項
     * @returns API 響應包裝對象
     */
    put: async <T, D = Record<string, unknown>>(endpoint: string, data?: D, options?: RequestInit): Promise<ApiResponse<T>> => {
      const url = `${baseUrl}${endpoint}`;
      return fetchApi<T>(url, {
        ...options,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      });
    },
    
    /**
     * 發送 DELETE 請求
     * @param endpoint - API 端點路徑（不含基礎 URL）
     * @param options - fetch API 選項
     * @returns API 響應包裝對象
     */
    delete: async <T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
      const url = `${baseUrl}${endpoint}`;
      return fetchApi<T>(url, { ...options, method: 'DELETE' });
    },
  };
} 