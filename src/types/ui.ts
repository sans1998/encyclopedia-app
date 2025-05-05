/**
 * UI組件相關類型定義
 */

import { ReactNode } from 'react';

/**
 * 標籤組件類型定義
 */
export interface TagProps {
  children: ReactNode;
  colorKey: string;
  variant?: 'pokemon' | 'digimon';
  className?: string;
  isDetail?: boolean;
  category?: 'type' | 'attribute' | 'level' | 'field';
}

/**
 * 標籤接口 (用於HOC中)
 */
export interface CreatureTag {
  label: string;
  colorKey: string;
  variant?: 'pokemon' | 'digimon';
  category?: 'type' | 'attribute' | 'level' | 'field';
}

/**
 * 卡片組件參數接口
 */
export interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'flat' | 'elevated';
  hoverable?: boolean;
  onClick?: () => void;
}

/**
 * 卡片內容區域參數接口
 */
export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * 生物卡片參數接口
 */
export interface CreatureCardProps {
  id: string | number;
  name: string;
  image?: string;
  tags: ReactNode;
  backgroundGradient: string;
  href: string;
} 