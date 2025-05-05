'use client';

import { withCreatureDetail } from '@/components/hoc/withCreatureDetail';
import { getPokemonDetail } from '@/services/pokemonService';
import { 
  errorMessages,
  pokemonStatNameMap
} from '@/utils/constants';
import { 
  CreatureType, 
  PokemonDetailData,
  AttributeGroup
} from '@/types';

// 使用HOC創建增強的寶可夢詳情組件
const PokemonDetail = withCreatureDetail<PokemonDetailData>({
  type: CreatureType.POKEMON,
  
  // 獲取寶可夢數據
  fetchData: async (id: string) => {
    const data = await getPokemonDetail(id);
    if (!data) throw new Error('Pokemon not found');
    return data as PokemonDetailData;
  },
  
  // 錯誤訊息
  errorMessage: errorMessages.POKEMON_DETAIL_ERROR,
  notFoundMessage: errorMessages.NO_POKEMON_FOUND,
  
  // 獲取圖片URL
  getImageUrl: (pokemon) => {
    return pokemon.sprites.other?.['official-artwork']?.front_default || 
      pokemon.sprites.front_default || null;
  },
  
  // 獲取標籤
  getTags: (pokemon) => {
    return pokemon.types.map(typeInfo => ({
      label: typeInfo.type.name,
      colorKey: typeInfo.type.name.toLowerCase(),
      variant: 'pokemon'
    }));
  },
  
  // 獲取描述
  getDescription: () => '', // 寶可夢API沒有提供描述，這裡為空
  
  // 獲取屬性分組
  getAttributeGroups: (pokemon) => {
    const groups: AttributeGroup[] = [
      {
        title: '身高與重量',
        attributes: [
          { key: '身高', value: `${pokemon.height / 10} 公尺` },
          { key: '重量', value: `${pokemon.weight / 10} 公斤` }
        ],
        layout: 'grid'
      },
      {
        title: '特性',
        attributes: pokemon.abilities.map(ability => ({ 
          key: '特性', 
          value: ability.ability.name 
        })),
        layout: 'list'
      }
    ];
    
    return groups;
  },
  
  // 獲取能力值
  getStats: (pokemon) => {
    return pokemon.stats.map(stat => {
      return {
        name: pokemonStatNameMap[stat.stat.name] || stat.stat.name,
        value: stat.base_stat,
        maxValue: 255, // 寶可夢能力值最大值為255
        color: 'bg-yellow-500'
      };
    });
  }
});

export default PokemonDetail; 