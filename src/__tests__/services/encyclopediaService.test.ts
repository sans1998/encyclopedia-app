import { 
  getEntitiesByType, 
  getEntityByType, 
  searchEntityByType
} from '@/services/encyclopediaService';
import * as pokemonService from '@/services/pokemonService';
import * as digimonService from '@/services/digimonService';
import { encyclopediaTypes } from '@/utils/constants';
import { Pokemon, Digimon } from '@/types';

// 模擬依賴服務
jest.mock('@/services/pokemonService');
jest.mock('@/services/digimonService');

describe('encyclopediaService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getEntitiesByType', () => {
    test('應該獲取寶可夢實體列表', async () => {
      const mockPokemonListResponse = {
        count: 1126,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
        ]
      };

      (pokemonService.getPokemonList as jest.Mock).mockResolvedValue(mockPokemonListResponse);

      const result = await getEntitiesByType(encyclopediaTypes.POKEMON);

      expect(pokemonService.getPokemonList).toHaveBeenCalledWith(0, 20);
      expect(result).toEqual({
        content: mockPokemonListResponse.results,
        pagination: {
          currentPage: 0,
          pageSize: 20,
          totalItems: 1126,
          totalPages: 57,
          hasNextPage: true,
          hasPrevPage: false
        }
      });
    });

    test('應該獲取數碼寶貝實體列表', async () => {
      const mockDigimonListResponse = {
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

      (digimonService.getDigimonList as jest.Mock).mockResolvedValue(mockDigimonListResponse);

      const result = await getEntitiesByType(encyclopediaTypes.DIGIMON);

      expect(digimonService.getDigimonList).toHaveBeenCalledWith(0, 20);
      expect(result).toEqual({
        content: mockDigimonListResponse.content,
        pagination: {
          currentPage: 0,
          pageSize: 2,
          totalItems: 1000,
          totalPages: 50,
          hasNextPage: true,
          hasPrevPage: false
        }
      });
    });

    test('應該處理自定義頁碼和頁面大小', async () => {
      const page = 2;
      const pageSize = 30;
      
      (pokemonService.getPokemonList as jest.Mock).mockResolvedValue({
        count: 1126,
        next: null,
        previous: null,
        results: []
      });

      await getEntitiesByType(encyclopediaTypes.POKEMON, page, pageSize);

      expect(pokemonService.getPokemonList).toHaveBeenCalledWith(page * pageSize, pageSize);
    });

    test('應該拒絕不支持的百科全書類型', async () => {
      await expect(getEntitiesByType('unknown')).rejects.toThrow('不支持的百科全書類型: unknown');
    });
  });

  describe('getEntityByType', () => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      sprites: { front_default: 'url' },
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }],
      stats: [{ base_stat: 45, stat: { name: 'hp' } }]
    };

    const mockDigimon: Digimon = {
      id: 1,
      name: 'Agumon',
      images: [{ href: 'url' }],
      types: [{ id: 1, type: 'vaccine' }],
      levels: [{ id: 1, level: 'rookie' }],
      attributes: [{ id: 1, attribute: 'vaccine' }],
      fields: [{ id: 1, field: 'nature', image: 'url' }],
      descriptions: []
    };

    test('應該獲取單個寶可夢實體', async () => {
      (pokemonService.getPokemonDetail as jest.Mock).mockResolvedValue(mockPokemon);

      const result = await getEntityByType(encyclopediaTypes.POKEMON, 1);

      expect(pokemonService.getPokemonDetail).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockPokemon);
    });

    test('應該獲取單個數碼寶貝實體', async () => {
      (digimonService.getDigimonDetail as jest.Mock).mockResolvedValue(mockDigimon);

      const result = await getEntityByType(encyclopediaTypes.DIGIMON, 'Agumon');

      expect(digimonService.getDigimonDetail).toHaveBeenCalledWith('Agumon');
      expect(result).toEqual(mockDigimon);
    });

    test('應該拒絕不支持的百科全書類型', async () => {
      await expect(getEntityByType('unknown', 1)).rejects.toThrow('不支持的百科全書類型: unknown');
    });
  });

  describe('searchEntityByType', () => {
    const mockPokemons: Pokemon[] = [
      {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprites: { front_default: 'url' },
        types: [{ type: { name: 'electric' } }],
        abilities: [{ ability: { name: 'static' } }],
        stats: [{ base_stat: 35, stat: { name: 'hp' } }]
      }
    ];

    const mockDigimons: Digimon[] = [
      {
        id: 1,
        name: 'Agumon',
        images: [{ href: 'url' }],
        types: [{ id: 1, type: 'vaccine' }],
        levels: [{ id: 1, level: 'rookie' }],
        attributes: [{ id: 1, attribute: 'vaccine' }],
        fields: [{ id: 1, field: 'nature', image: 'url' }],
        descriptions: []
      }
    ];

    test('應該搜索寶可夢實體', async () => {
      (pokemonService.searchPokemon as jest.Mock).mockResolvedValue(mockPokemons);

      const result = await searchEntityByType(encyclopediaTypes.POKEMON, 'pikachu');

      expect(pokemonService.searchPokemon).toHaveBeenCalledWith('pikachu');
      expect(result).toEqual(mockPokemons);
    });

    test('應該搜索數碼寶貝實體', async () => {
      (digimonService.searchDigimon as jest.Mock).mockResolvedValue(mockDigimons);

      const result = await searchEntityByType(encyclopediaTypes.DIGIMON, 'Agumon');

      expect(digimonService.searchDigimon).toHaveBeenCalledWith('Agumon');
      expect(result).toEqual(mockDigimons);
    });

    test('應該拒絕不支持的百科全書類型', async () => {
      await expect(searchEntityByType('unknown', 'query')).rejects.toThrow('不支持的百科全書類型: unknown');
    });
  });
}); 