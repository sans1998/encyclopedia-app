import { ApiResponse, HttpStatusCode, HttpMethod, ContentType } from '@/types';
import { HttpStatusMessages } from '@/utils/constants';

/**
 * 取得對應 HTTP 狀態碼的錯誤信息
 */
function getErrorMessageForStatus(status: number): string {
  return HttpStatusMessages[status] || `API 請求失敗: ${status}`;
}

/**
 * 通用的 HTTP 客戶端工具，用於處理 API 請求
 * @param url - 請求的 URL
 * @param options - fetch API 選項
 * @returns API 響應包裝對象
 */
export async function fetchApi<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);
    const status = response.status;
    const ok = response.ok;

    let data: T | undefined = undefined;
    let error: string | undefined = undefined;

    if (ok) {
      data = await tryParseJson<T>(response);
      if (data === undefined) {
        error = '響應解析失敗';
      }
    } else {
      error = getErrorMessageForStatus(status);
    }

    return { ok, status, data, error };
  } catch (err) {
    return {
      ok: false,
      status: HttpStatusCode.NETWORK_ERROR,
      error: err instanceof Error ? `網路錯誤: ${err.message}` : '網路連接失敗'
    };
  }
}

/**
 * 嘗試解析 JSON 響應
 * @param response - fetch API 響應對象
 * @returns 解析後的 JSON 數據或 undefined
 */
export async function tryParseJson<T>(response: Response): Promise<T | undefined> {
  try {
    return await response.json();
  } catch {
    return undefined;
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
      return fetchApi<T>(url, { ...options, method: HttpMethod.GET });
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
        method: HttpMethod.POST,
        headers: {
          'Content-Type': ContentType.JSON,
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
        method: HttpMethod.PUT,
        headers: {
          'Content-Type': ContentType.JSON,
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
      return fetchApi<T>(url, { ...options, method: HttpMethod.DELETE });
    },
  };
} 