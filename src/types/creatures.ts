/**
 * 生物共用類型定義 (寶可夢與數碼寶貝共用的類型)
 */

import { ReactNode } from 'react';

/**
 * 生物類型枚舉
 */
export enum CreatureType {
  POKEMON = 'pokemon',
  DIGIMON = 'digimon'
}

/**
 * 統計數據接口
 */
export interface Stat {
  name: string;
  value: number;
  maxValue?: number;
  color?: string;
}

/**
 * 詳情頁標籤接口
 */
export interface DetailTag {
  id: string | number;
  label: string;
  colorKey: string;
  variant?: 'pokemon' | 'digimon';
  category?: 'type' | 'attribute' | 'level' | 'field';
}

/**
 * 屬性分組接口
 */
export interface AttributeGroup {
  title: string;
  attributes: Array<{key: string, value: string | number}>;
  layout?: 'grid' | 'list';
}

/**
 * 詳情頁參數接口
 */
export interface CreatureDetailProps {
  id: string | number;
  name: string;
  imageUrl: string | null;
  tags: ReactNode[];
  description?: string;
  stats?: Stat[];
  attributeGroups?: AttributeGroup[];
  variant?: 'pokemon' | 'digimon';
  className?: string;
  onBack?: () => void;
}

/**
 * 生物詳情HOC配置接口
 */
export interface WithCreatureDetailConfig<T> {
  type: CreatureType;
  // 數據獲取函數
  fetchData: (id: string) => Promise<T>;
  // 錯誤訊息
  errorMessage: string;
  notFoundMessage: string;
  // 數據轉換函數
  getImageUrl: (data: T) => string | null;
  getTags: (data: T) => Array<{
    label: string;
    colorKey: string;
    category?: 'type' | 'attribute' | 'level' | 'field';
    variant?: 'pokemon' | 'digimon';
  }>;
  getDescription: (data: T) => string;
  getStats?: (data: T) => Stat[];
  getAttributeGroups?: (data: T) => AttributeGroup[];
}

/**
 * HOC配置接口 (卡片)
 */
export interface WithCreatureCardConfig<T> {
  type: CreatureType;
  getBackgroundGradient: (data: T) => string;
  getTags: (data: T) => Array<{
    label: string;
    colorKey: string;
    category?: 'type' | 'attribute' | 'level' | 'field';
    variant?: 'pokemon' | 'digimon';
  }>;
  getImageUrl: (data: T) => string | undefined;
  getDetailUrl: (data: T) => string;
}

/**
 * 寶可夢詳情頁數據類型
 */
export interface PokemonDetailData {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  sprites: {
    front_default?: string;
    other?: {
      'official-artwork'?: {
        front_default?: string;
      }
    }
  };
  height: number;
  weight: number;
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
}

/**
 * 數碼寶貝詳情頁數據類型
 */
export interface DigimonDetailData {
  id: number;
  name: string;
  images: Array<{ href: string }>;
  types: Array<{ type: string }>;
  attributes: Array<{ attribute: string }>;
  levels: Array<{ level: string }>;
  fields: Array<{ field: string }>;
  descriptions: Array<{ language: string; description: string }>;
}