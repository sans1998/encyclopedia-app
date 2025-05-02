import { fetchApi, createApiClient, tryParseJson } from '@/services/httpClient';
import { HttpMethod, ContentType, HttpStatusCode } from '@/types';

// 模擬 fetch API
global.fetch = jest.fn();

describe('httpClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchApi', () => {
    test('成功處理API響應並解析JSON數據', async () => {
      const mockData = { success: true, message: 'test data' };
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockData),
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      
      const result = await fetchApi('https://test.api/endpoint');
      
      expect(global.fetch).toHaveBeenCalledWith('https://test.api/endpoint', undefined);
      expect(result).toEqual({
        ok: true,
        status: 200,
        data: mockData,
        error: undefined
      });
    });

    test('處理非成功的API響應', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: jest.fn(),
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      
      const result = await fetchApi('https://test.api/endpoint');
      
      expect(global.fetch).toHaveBeenCalledWith('https://test.api/endpoint', undefined);
      expect(result).toEqual({
        ok: false,
        status: 404,
        data: undefined,
        error: '找不到請求的資源'
      });
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    test('處理JSON解析失敗的情況', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      
      const result = await fetchApi('https://test.api/endpoint');
      
      expect(result).toEqual({
        ok: true,
        status: 200,
        data: undefined,
        error: '響應解析失敗'
      });
    });

    test('處理網路錯誤', async () => {
      const networkError = new Error('Network failure');
      (global.fetch as jest.Mock).mockRejectedValue(networkError);
      
      const result = await fetchApi('https://test.api/endpoint');
      
      expect(result).toEqual({
        ok: false,
        status: HttpStatusCode.NETWORK_ERROR,
        error: `網路錯誤: ${networkError.message}`,
        data: undefined
      });
    });
  });

  describe('tryParseJson', () => {
    test('成功解析JSON響應', async () => {
      const mockData = { success: true };
      const mockResponse = {
        json: jest.fn().mockResolvedValue(mockData),
      };
      
      const result = await tryParseJson(mockResponse as unknown as Response);
      
      expect(result).toEqual(mockData);
    });

    test('處理JSON解析錯誤', async () => {
      const mockResponse = {
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      };
      
      const result = await tryParseJson(mockResponse as unknown as Response);
      
      expect(result).toBeUndefined();
    });
  });

  describe('createApiClient', () => {
    const baseUrl = 'https://test.api';
    let apiClient: ReturnType<typeof createApiClient>;
    
    beforeEach(() => {
      apiClient = createApiClient(baseUrl);
      console.error = jest.fn(); // 抑制控制台錯誤
    });
    
    test('創建的客戶端包含所有必要的方法', () => {
      expect(apiClient).toHaveProperty('get');
      expect(apiClient).toHaveProperty('post');
      expect(apiClient).toHaveProperty('put');
      expect(apiClient).toHaveProperty('delete');
    });

    test('當baseUrl為空時記錄錯誤', () => {
      createApiClient('');
      expect(console.error).toHaveBeenCalledWith('API URL not configured');
    });

    test('get方法正確調用fetchApi', async () => {
      const mockData = { success: true };
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockData),
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      
      await apiClient.get('/endpoint');
      
      expect(global.fetch).toHaveBeenCalledWith('https://test.api/endpoint', {
        method: HttpMethod.GET
      });
    });

    test('post方法正確調用fetchApi', async () => {
      const mockData = { success: true };
      const requestData = { name: 'test' };
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockData),
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      
      await apiClient.post('/endpoint', requestData);
      
      expect(global.fetch).toHaveBeenCalledWith('https://test.api/endpoint', {
        method: HttpMethod.POST,
        headers: {
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify(requestData),
      });
    });

    test('put方法正確調用fetchApi', async () => {
      const mockData = { success: true };
      const requestData = { name: 'test' };
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockData),
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      
      await apiClient.put('/endpoint', requestData);
      
      expect(global.fetch).toHaveBeenCalledWith('https://test.api/endpoint', {
        method: HttpMethod.PUT,
        headers: {
          'Content-Type': ContentType.JSON,
        },
        body: JSON.stringify(requestData),
      });
    });

    test('delete方法正確調用fetchApi', async () => {
      const mockData = { success: true };
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockData),
      };
      
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      
      await apiClient.delete('/endpoint');
      
      expect(global.fetch).toHaveBeenCalledWith('https://test.api/endpoint', {
        method: HttpMethod.DELETE
      });
    });
  });
}); 