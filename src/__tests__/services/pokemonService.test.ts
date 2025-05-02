import { createApiClient } from '@/services/httpClient';
import { getPokemonList, getPokemonDetail, getPokemonDetails, searchPokemon } from '@/services/pokemonService';
import { Pokemon, PokemonListResponse } from '@/types';
import { ITEMS_PER_PAGE } from '@/utils/constants';

// 模擬 httpClient 模組
jest.mock('@/services/httpClient');

describe('pokemonService', () => {
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

  describe('getPokemonList', () => {
    const mockListResponse: PokemonListResponse = {
      count: 1126,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ]
    };

    test('成功獲取寶可夢列表', async () => {
      mockApiClient.get.mockResolvedValue({
        ok: true,
        status: 200,
        data: mockListResponse
      });

      const result = await getPokemonList();

      expect(mockApiClient.get).toHaveBeenCalledWith(`/pokemon?offset=0&limit=${ITEMS_PER_PAGE}`);
      expect(result).toEqual(mockListResponse);
    });

    test('使用自定義的偏移量和限制獲取寶可夢列表', async () => {
      const offset = 40;
      const limit = 30;
      
      mockApiClient.get.mockResolvedValue({
        ok: true,
        status: 200,
        data: mockListResponse
      });

      await getPokemonList(offset, limit);

      expect(mockApiClient.get).toHaveBeenCalledWith(`/pokemon?offset=${offset}&limit=${limit}`);
    });

    test('處理API響應失敗的情況', async () => {
      mockApiClient.get.mockResolvedValue({
        ok: false,
        status: 500,
        error: '伺服器內部錯誤'
      });

      const result = await getPokemonList();

      expect(result).toEqual({
        count: 0,
        next: null,
        previous: null,
        results: []
      });
    });
  });

  describe('getPokemonDetail', () => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        other: {
          'official-artwork': {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
          }
        }
      },
      types: [
        { type: { name: 'grass' } },
        { type: { name: 'poison' } }
      ],
      abilities: [
        { ability: { name: 'overgrow' } },
        { ability: { name: 'chlorophyll' } }
      ],
      stats: [
        { base_stat: 45, stat: { name: 'hp' } },
        { base_stat: 49, stat: { name: 'attack' } }
      ]
    };

    test('通過ID成功獲取寶可夢詳情', async () => {
      mockApiClient.get.mockResolvedValue({
        ok: true,
        status: 200,
        data: mockPokemon
      });

      const result = await getPokemonDetail(1);

      expect(mockApiClient.get).toHaveBeenCalledWith('/pokemon/1');
      expect(result).toEqual(mockPokemon);
    });

    test('通過名稱成功獲取寶可夢詳情', async () => {
      mockApiClient.get.mockResolvedValue({
        ok: true,
        status: 200,
        data: mockPokemon
      });

      const result = await getPokemonDetail('bulbasaur');

      expect(mockApiClient.get).toHaveBeenCalledWith('/pokemon/bulbasaur');
      expect(result).toEqual(mockPokemon);
    });

    test('處理API響應失敗的情況', async () => {
      mockApiClient.get.mockResolvedValue({
        ok: false,
        status: 404,
        error: '找不到請求的資源'
      });

      const result = await getPokemonDetail('unknown-pokemon');

      expect(result).toBeNull();
    });
  });

  describe('getPokemonDetails', () => {
    const mockUrls = [
      'https://pokeapi.co/api/v2/pokemon/1/',
      'https://pokeapi.co/api/v2/pokemon/2/'
    ];
    
    const mockPokemon1: Pokemon = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      sprites: { front_default: 'url1' },
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }],
      stats: [{ base_stat: 45, stat: { name: 'hp' } }]
    };
    
    const mockPokemon2: Pokemon = {
      id: 2,
      name: 'ivysaur',
      height: 10,
      weight: 130,
      sprites: { front_default: 'url2' },
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }],
      stats: [{ base_stat: 60, stat: { name: 'hp' } }]
    };

    test('成功獲取多個寶可夢的詳情', async () => {
      mockApiClient.get
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockPokemon1
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockPokemon2
        });

      const result = await getPokemonDetails(mockUrls);

      expect(mockApiClient.get).toHaveBeenCalledTimes(2);
      expect(mockApiClient.get).toHaveBeenNthCalledWith(1, '/pokemon/1');
      expect(mockApiClient.get).toHaveBeenNthCalledWith(2, '/pokemon/2');
      expect(result).toEqual([mockPokemon1, mockPokemon2]);
    });

    test('處理部分請求失敗的情況', async () => {
      mockApiClient.get
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          data: mockPokemon1
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
          error: '找不到請求的資源'
        });

      const result = await getPokemonDetails(mockUrls);

      expect(result).toEqual([mockPokemon1]);
    });

    test('處理請求異常的情況', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Network error'));

      const result = await getPokemonDetails(mockUrls);

      expect(result).toEqual([]);
    });
  });

  describe('searchPokemon', () => {
    const mockPokemon: Pokemon = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      sprites: { front_default: 'pikachu-url' },
      types: [{ type: { name: 'electric' } }],
      abilities: [{ ability: { name: 'static' } }],
      stats: [{ base_stat: 35, stat: { name: 'hp' } }]
    };
    
    const mockListResponse: PokemonListResponse = {
      count: 1126,
      next: null,
      previous: null,
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'raichu', url: 'https://pokeapi.co/api/v2/pokemon/26/' }
      ]
    };

    test('通過精確名稱搜索成功', async () => {
      mockApiClient.get.mockResolvedValueOnce({
        ok: true,
        status: 200,
        data: mockPokemon
      });

      const result = await searchPokemon('pikachu');

      expect(mockApiClient.get).toHaveBeenCalledWith('/pokemon/pikachu');
      expect(result).toEqual([mockPokemon]);
    });

    test('通過部分名稱搜索成功', async () => {
      // 模擬直接獲取失敗
      mockApiClient.get.mockImplementation(async (endpoint) => {
        if (endpoint === '/pokemon/pika') {
          return {
            ok: false,
            status: 404,
            error: '找不到請求的資源'
          };
        } else if (endpoint === '/pokemon?offset=0&limit=100') {
          return {
            ok: true,
            status: 200,
            data: mockListResponse
          };
        } else if (endpoint === '/pokemon/25') {
          return {
            ok: true,
            status: 200,
            data: mockPokemon
          };
        }
      });

      const result = await searchPokemon('pika');

      expect(mockApiClient.get).toHaveBeenCalledWith('/pokemon/pika');
      expect(mockApiClient.get).toHaveBeenCalledWith('/pokemon?offset=0&limit=100');
      expect(mockApiClient.get).toHaveBeenCalledWith('/pokemon/25');
      expect(result).toEqual([mockPokemon]);
    });

    test('處理搜索無結果的情況', async () => {
      // 模擬直接獲取失敗
      mockApiClient.get.mockImplementation(async (endpoint) => {
        if (endpoint === '/pokemon/unknown') {
          return {
            ok: false,
            status: 404,
            error: '找不到請求的資源'
          };
        } else if (endpoint === '/pokemon?offset=0&limit=100') {
          return {
            ok: true,
            status: 200,
            data: {
              count: 1126,
              next: null,
              previous: null,
              results: []
            }
          };
        }
      });

      const result = await searchPokemon('unknown');

      expect(result).toEqual([]);
    });
  });
}); 