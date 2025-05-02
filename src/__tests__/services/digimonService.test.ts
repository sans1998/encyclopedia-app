import { createApiClient } from '@/services/httpClient';
import { getDigimonList, getDigimonDetail, searchDigimon, getEnhancedDigimonList } from '@/services/digimonService';
import { Digimon, DigimonListResponse, RawDigimonData, SimpleDigimon } from '@/types';
import { ITEMS_PER_PAGE } from '@/utils/constants';

// 模擬 httpClient 模組
jest.mock('@/services/httpClient');

describe('digimonService', () => {
  const mockApiClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createApiClient as jest.Mock).mockReturnValue(mockApiClient);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getDigimonList', () => {
    const mockApiListResponse = {
      content: [
        { id: 1, name: 'Agumon', image: 'image1.jpg', href: '/digimon/1' },
        { id: 2, name: 'Gabumon', image: 'image2.jpg', href: '/digimon/2' }
      ],
      pageable: {
        currentPage: 0,
        elementsOnPage: 2,
        totalElements: 1000,
        totalPages: 50,
        previousPage: null,
        nextPage: '/digimon?page=1&pageSize=20'
      }
    };

    test('成功獲取數碼寶貝列表', async () => {
      mockApiClient.get.mockResolvedValue({
        ok: true,
        status: 200,
        data: mockApiListResponse
      });

      const result = await getDigimonList();

      expect(mockApiClient.get).toHaveBeenCalledWith(`/digimon?page=0&pageSize=${ITEMS_PER_PAGE}`);
      expect(result).toEqual(mockApiListResponse);
    });

    test('使用自定義的頁碼和頁面大小獲取數碼寶貝列表', async () => {
      const page = 2;
      const pageSize = 30;
      
      mockApiClient.get.mockResolvedValue({
        ok: true,
        status: 200,
        data: mockApiListResponse
      });

      await getDigimonList(page, pageSize);

      expect(mockApiClient.get).toHaveBeenCalledWith(`/digimon?page=${page}&pageSize=${pageSize}`);
    });

    test('處理API響應失敗的情況', async () => {
      mockApiClient.get.mockResolvedValue({
        ok: false,
        status: 500,
        error: '伺服器內部錯誤'
      });

      const result = await getDigimonList();

      expect(result).toEqual({
        content: [],
        pageable: {
          currentPage: 0,
          elementsOnPage: 0,
          totalElements: 0,
          totalPages: 1,
          previousPage: null,
          nextPage: null
        }
      });
    });

    test('處理舊版API格式的響應', async () => {
      // 舊版API格式是一個數組
      const mockOldApiResponse = [
        {
          id: 1,
          name: 'Agumon',
          images: [{ href: 'image1.jpg' }],
          levels: [{ id: 1, level: 'rookie' }],
          types: [{ id: 1, type: 'virus' }],
          attributes: [{ id: 1, attribute: 'vaccine' }],
          fields: [{ id: 1, field: 'nature', image: 'field1.jpg' }],
          descriptions: [{ language: 'en', description: 'Description' }]
        }
      ];

      mockApiClient.get.mockResolvedValue({
        ok: true,
        status: 200,
        data: mockOldApiResponse
      });

      const result = await getDigimonList();

      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('pageable');
      expect(result.content).toHaveLength(1);
      expect(result.content[0]).toHaveProperty('id', 1);
      expect(result.content[0]).toHaveProperty('name', 'Agumon');
    });
  });

  describe('getDigimonDetail', () => {
    const mockRawDigimonData: RawDigimonData = {
      id: 1,
      name: 'Agumon',
      images: [{ href: 'image1.jpg' }],
      levels: [{ id: 1, level: 'rookie' }],
      types: [{ id: 1, type: 'virus' }],
      attributes: [{ id: 1, attribute: 'vaccine' }],
      fields: [{ id: 1, field: 'nature', image: 'field1.jpg' }],
      descriptions: [{ language: 'en', description: 'Description' }]
    };

    test('通過ID成功獲取數碼寶貝詳情', async () => {
      mockApiClient.get.mockResolvedValue({
        ok: true,
        status: 200,
        data: mockRawDigimonData
      });

      const result = await getDigimonDetail(1);

      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon/1');
      expect(result).toEqual({
        id: 1,
        name: 'Agumon',
        images: [{ href: 'image1.jpg' }],
        levels: [{ id: 1, level: 'rookie' }],
        types: [{ id: 1, type: 'virus' }],
        attributes: [{ id: 1, attribute: 'vaccine' }],
        fields: [{ id: 1, field: 'nature', image: 'field1.jpg' }],
        descriptions: [{ language: 'en', description: 'Description' }]
      });
    });

    test('通過名稱獲取數碼寶貝詳情', async () => {
      mockApiClient.get.mockResolvedValue({
        ok: true,
        status: 200,
        data: mockRawDigimonData
      });

      const result = await getDigimonDetail('Agumon');

      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon/Agumon');
      expect(result).toEqual(expect.objectContaining({
        id: 1,
        name: 'Agumon'
      }));
    });

    test('處理API響應失敗的情況', async () => {
      mockApiClient.get.mockResolvedValue({
        ok: false,
        status: 404,
        error: '找不到請求的資源'
      });

      const result = await getDigimonDetail('unknown-digimon');

      expect(result).toBeNull();
    });

    test('處理格式不正確的數據', async () => {
      // 數據缺少必要欄位
      const invalidData = {
        id: 1
        // 缺少 name 和其他必要欄位
      };

      mockApiClient.get.mockResolvedValue({
        ok: true,
        status: 200,
        data: invalidData
      });

      const result = await getDigimonDetail(1);

      expect(result).toEqual({
        id: 1,
        name: '',
        images: [],
        types: [],
        levels: [],
        attributes: [],
        fields: [],
        descriptions: []
      });
    });
  });

  describe('searchDigimon', () => {
    const mockDigimon: Digimon = {
      id: 1,
      name: 'Agumon',
      images: [{ href: 'image1.jpg' }],
      levels: [{ id: 1, level: 'rookie' }],
      types: [{ id: 1, type: 'virus' }],
      attributes: [{ id: 1, attribute: 'vaccine' }],
      fields: [{ id: 1, field: 'nature', image: 'field1.jpg' }],
      descriptions: [{ language: 'en', description: 'Description' }]
    };
    
    const mockListResponse = {
      content: [
        { id: 1, name: 'Agumon', image: 'image1.jpg', href: '/digimon/1' },
        { id: 2, name: 'Agunimon', image: 'image2.jpg', href: '/digimon/2' }
      ],
      pageable: {
        currentPage: 0,
        elementsOnPage: 2,
        totalElements: 2,
        totalPages: 1,
        previousPage: null,
        nextPage: null
      }
    };

    test('通過精確名稱搜索成功', async () => {
      mockApiClient.get.mockResolvedValueOnce({
        ok: true,
        status: 200,
        data: mockDigimon
      });

      const result = await searchDigimon('Agumon');

      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon/Agumon');
      expect(result).toEqual([mockDigimon]);
    });

    test('通過API搜索端點搜索成功', async () => {
      // 模擬直接獲取失敗，然後通過搜索獲取
      mockApiClient.get
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
          error: '找不到請求的資源'
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockListResponse
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockDigimon
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: { ...mockDigimon, id: 2, name: 'Agunimon' }
        });

      const result = await searchDigimon('Agu');

      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon/Agu');
      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon?name=Agu');
      // 應該針對每個搜索結果獲取詳情
      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon/1');
      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon/2');
      expect(result).toHaveLength(2);
    });

    test('通過獲取列表並過濾搜索成功', async () => {
      // 模擬API搜索端點也失敗，回退到獲取列表並過濾
      mockApiClient.get
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
          error: '找不到請求的資源'
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          error: '伺服器內部錯誤'
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockListResponse
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockDigimon
        });

      const result = await searchDigimon('Agu');

      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon/Agu');
      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon?name=Agu');
      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon?page=0&pageSize=100');
      expect(result.length).toBeGreaterThan(0);
    });

    test('處理搜索無結果的情況', async () => {
      mockApiClient.get
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
          error: '找不到請求的資源'
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: {
            content: [],
            pageable: {
              currentPage: 0,
              elementsOnPage: 0,
              totalElements: 0,
              totalPages: 1,
              previousPage: null,
              nextPage: null
            }
          }
        });

      const result = await searchDigimon('NonExistent');

      expect(result).toEqual([]);
    });
  });

  describe('getEnhancedDigimonList', () => {
    const mockSimpleDigimon: SimpleDigimon[] = [
      { id: 1, name: 'Agumon', image: 'image1.jpg', href: '/digimon/1' },
      { id: 2, name: 'Gabumon', image: 'image2.jpg', href: '/digimon/2' }
    ];

    const mockListResponse: DigimonListResponse = {
      content: mockSimpleDigimon,
      pageable: {
        currentPage: 0,
        elementsOnPage: 2,
        totalElements: 1000,
        totalPages: 50,
        previousPage: null,
        nextPage: '/digimon?page=1&pageSize=20'
      }
    };

    const mockDetailData1: RawDigimonData = {
      id: 1,
      name: 'Agumon',
      images: [{ href: 'image1.jpg' }],
      levels: [{ id: 1, level: 'rookie' }],
      types: [{ id: 1, type: 'virus' }],
      attributes: [{ id: 1, attribute: 'vaccine' }],
      fields: [{ id: 1, field: 'nature', image: 'field1.jpg' }],
      descriptions: []
    };

    const mockDetailData2: RawDigimonData = {
      id: 2,
      name: 'Gabumon',
      images: [{ href: 'image2.jpg' }],
      levels: [{ id: 1, level: 'champion' }],
      types: [{ id: 1, type: 'vaccine' }],
      attributes: [{ id: 1, attribute: 'data' }],
      fields: [{ id: 1, field: 'nature', image: 'field1.jpg' }],
      descriptions: []
    };

    test('成功獲取增強的數碼寶貝列表', async () => {
      mockApiClient.get
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockListResponse
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockDetailData1
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockDetailData2
        });

      const result = await getEnhancedDigimonList();

      expect(mockApiClient.get).toHaveBeenCalledWith(`/digimon?page=0&pageSize=${ITEMS_PER_PAGE}`);
      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon/1');
      expect(mockApiClient.get).toHaveBeenCalledWith('/digimon/2');
      
      expect(result.content).toHaveLength(2);
      expect(result.content[0]).toHaveProperty('primaryAttribute', 'vaccine');
      expect(result.content[0]).toHaveProperty('primaryLevel', 'rookie');
      expect(result.content[1]).toHaveProperty('primaryAttribute', 'data');
      expect(result.content[1]).toHaveProperty('primaryLevel', 'champion');
    });

    test('處理詳情獲取失敗的情況', async () => {
      mockApiClient.get
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockListResponse
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockDetailData1
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
          error: '找不到請求的資源'
        });

      const result = await getEnhancedDigimonList();

      expect(result.content).toHaveLength(2);
      expect(result.content[0]).toHaveProperty('primaryAttribute', 'vaccine');
      expect(result.content[1]).not.toHaveProperty('primaryAttribute');
    });

    test('處理完整Digimon對象', async () => {
      const mockDigimonContent: Digimon[] = [
        {
          id: 1,
          name: 'Agumon',
          images: [{ href: 'image1.jpg' }],
          levels: [{ id: 1, level: 'rookie' }],
          types: [{ id: 1, type: 'virus' }],
          attributes: [{ id: 1, attribute: 'vaccine' }],
          fields: [{ id: 1, field: 'nature', image: 'field1.jpg' }],
          descriptions: []
        }
      ];

      mockApiClient.get.mockResolvedValueOnce({
        ok: true,
        status: 200,
        data: {
          content: mockDigimonContent,
          pageable: mockListResponse.pageable
        }
      });

      const result = await getEnhancedDigimonList();

      expect(result.content[0]).toHaveProperty('primaryAttribute', 'vaccine');
      expect(result.content[0]).toHaveProperty('primaryLevel', 'rookie');
      // 不應該再次獲取詳情，因為已經有完整對象
      expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    });
  });
}); 