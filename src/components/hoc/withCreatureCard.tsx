import React from 'react';
import CreatureCard from '@/components/ui/CreatureCard';
import { 
  pokemonTypeGradients, 
  digimonTypeGradients,
  digimonAttributeGradients
} from '@/utils/constants';
import Tag from '@/components/common/Tag';
import {
  CreatureType,
  CreatureTag,
  WithCreatureCardConfig,
  Pokemon,
  Digimon
} from '@/types';

// 定義擴展的數碼寶貝類型 (僅在此文件內使用)
type ExtendedDigimon = Digimon & {
  type?: string;
  attribute?: string;
  primaryType?: string;
  primaryAttribute?: string;
  image?: string;
};

// 高階組件，根據生物類型返回合適的卡片組件
export function withCreatureCard<T extends { id: string | number; name: string }>(
  config: WithCreatureCardConfig<T>
) {
  return function EnhancedCreatureCard(data: T) {
    const { 
      type, 
      getBackgroundGradient, 
      getTags, 
      getImageUrl, 
      getDetailUrl 
    } = config;
    
    // 獲取必要的卡片屬性
    const { id, name } = data;
    const backgroundGradient = getBackgroundGradient(data);
    const tags = getTags(data);
    const image = getImageUrl(data);
    const href = getDetailUrl(data);
    
    // 渲染標籤
    const renderedTags = tags.map((tag, index) => (
      <Tag
        key={`${tag.label}-${index}`}
        colorKey={tag.colorKey}
        variant={type as 'pokemon' | 'digimon'}
        category={tag.category}
      >
        {tag.label}
      </Tag>
    ));
    
    // 渲染增強的生物卡片
    return (
      <CreatureCard
        id={id}
        name={name}
        image={image}
        tags={renderedTags}
        backgroundGradient={backgroundGradient}
        href={href}
      />
    );
  };
}

// 使用示例：為寶可夢創建卡片
export const createPokemonCard = withCreatureCard<Pokemon>({
  type: CreatureType.POKEMON,
  getBackgroundGradient: (pokemon) => {
    const types = pokemon.types.map(t => t.type.name);
    if (!types || types.length === 0) return '';
    
    const primaryType = types[0].toLowerCase();
    return pokemonTypeGradients[primaryType] || '';
  },
  getTags: (pokemon) => {
    return pokemon.types.map(t => ({
      label: t.type.name,
      colorKey: t.type.name.toLowerCase()
    }));
  },
  getImageUrl: (pokemon) => pokemon.sprites.front_default || '',
  getDetailUrl: (pokemon) => `/pokemon/${pokemon.id}`
});

// 使用示例：為數碼寶貝創建卡片，增強靈活性處理不同數據結構
export const createDigimonCard = withCreatureCard<ExtendedDigimon>({
  type: CreatureType.DIGIMON,
  getBackgroundGradient: (digimon) => {
    // 使用類型信息生成背景漸變色
    const typeRaw = digimon.types?.[0]?.type || 
                 digimon.type ||
                 digimon.primaryType ||
                 'unknown';
    
    // 將類型轉為小寫並規範化
    const typeKey = typeRaw.toLowerCase().replace(' ', '-');
    const typeGradient = digimonTypeGradients[typeKey];
    
    if (typeGradient) {
      return typeGradient;
    }
    
    // 如果沒有找到類型漸變色，回退到使用屬性漸變色
    const attributeRaw = digimon.attributes?.[0]?.attribute || 
                      digimon.attribute ||
                      digimon.primaryAttribute ||
                      'unknown';
    
    const attributeKey = attributeRaw.toLowerCase().replace(' ', '-');
    const attributeGradient = digimonAttributeGradients[attributeKey];
    
    // 返回屬性漸變色或默認漸變色
    return attributeGradient || 'from-gray-100 to-gray-200';
  },
  getTags: (digimon) => {
    // 獲取類型和屬性信息以創建標籤
    const tags: CreatureTag[] = [];
    
    // 添加類型標籤
    const type = digimon.types?.[0]?.type || 
                digimon.type || 
                digimon.primaryType || 
                '';
    if (type) {
      tags.push({
        label: type,
        colorKey: type.toLowerCase().replace(' ', '-'),
        category: 'type'
      });
    }
    
    // 添加屬性標籤
    const attribute = digimon.attributes?.[0]?.attribute || 
                     digimon.attribute || 
                     digimon.primaryAttribute || 
                     '';
    if (attribute) {
      tags.push({
        label: attribute,
        colorKey: attribute.toLowerCase().replace(' ', '-'),
        category: 'attribute'
      });
    }
    
    // 如果沒有任何標籤，添加一個默認標籤
    if (tags.length === 0) {
      tags.push({
        label: '數碼寶貝',
        colorKey: 'unknown',
        category: 'type'
      });
    }
    
    return tags;
  },
  getImageUrl: (digimon) => {
    // 更靈活地獲取圖片URL
    return digimon.images?.[0]?.href || 
           digimon.image || 
           '';
  },
  getDetailUrl: (digimon) => `/digimon/${digimon.id}`
}); 