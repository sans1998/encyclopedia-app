import React from 'react';
import { cn } from '@/utils/classNames';
import { 
  pokemonTypeDetailColorMap,
  digimonTypeDetailColorMap,
  digimonAttributeDetailColorMap,
  digimonLevelDetailColorMap,
  digimonFieldDetailColorMap
} from '@/utils/constants';
import { TagProps } from '@/types';

export const Tag: React.FC<TagProps> = ({
  children,
  colorKey,
  variant = 'pokemon',
  className,
  isDetail = false,
  category
}) => {
  let backgroundClass = '';
  let textClass = '';
  let borderClass = '';
  
  // 處理顏色鍵，去除前綴並轉為小寫
  const normalizedKey = colorKey.toLowerCase().replace(/\s+/g, '-');
  
  // 自動檢測類別
  let detectedCategory = category;
  if (!detectedCategory && variant === 'digimon') {
    if (colorKey.startsWith('type-') || normalizedKey === 'beast' || normalizedKey === 'dragon') {
      detectedCategory = 'type';
    } else if (colorKey.startsWith('attribute-') || normalizedKey === 'vaccine' || normalizedKey === 'virus' || normalizedKey === 'data') {
      detectedCategory = 'attribute';
    } else if (normalizedKey === 'rookie' || normalizedKey === 'champion' || normalizedKey === 'ultimate' || normalizedKey === 'mega') {
      detectedCategory = 'level';
    }
  }
  
  if (isDetail) {
    // 詳情頁使用實色背景
    if (variant === 'pokemon') {
      // 處理寶可夢類型
      const colors = pokemonTypeDetailColorMap[normalizedKey] || { 
        bg: 'bg-gray-300', 
        border: 'border-gray-400', 
        text: 'text-gray-800' 
      };
      backgroundClass = colors.bg;
      borderClass = colors.border;
      textClass = colors.text;
    } else {
      // 處理數碼寶貝標籤
      if (detectedCategory === 'type') {
        // 類型標籤 - 藍色
        const colors = digimonTypeDetailColorMap[normalizedKey] || digimonTypeDetailColorMap['unknown'];
        backgroundClass = colors.bg;
        borderClass = colors.border;
        textClass = colors.text;
      } else if (detectedCategory === 'attribute') {
        // 屬性標籤 - 依屬性變色
        const colors = digimonAttributeDetailColorMap[normalizedKey] || digimonAttributeDetailColorMap['unknown'];
        backgroundClass = colors.bg;
        borderClass = colors.border;
        textClass = colors.text;
      } else if (detectedCategory === 'field') {
        // 屬域標籤 - 靛藍色
        const colors = digimonFieldDetailColorMap[normalizedKey] || digimonFieldDetailColorMap['unknown'];
        backgroundClass = colors.bg;
        borderClass = colors.border;
        textClass = colors.text;
      } else {
        // 等級標籤 - 灰色
        const colors = digimonLevelDetailColorMap[normalizedKey] || digimonLevelDetailColorMap['unknown'];
        backgroundClass = colors.bg;
        borderClass = colors.border;
        textClass = colors.text;
      }
    }
  } else {
    // 列表頁使用跟詳情頁相同的顏色，但無邊框
    if (variant === 'pokemon') {
      // 處理寶可夢類型
      const colors = pokemonTypeDetailColorMap[normalizedKey] || { 
        bg: 'bg-gray-300', 
        text: 'text-gray-800' 
      };
      backgroundClass = colors.bg;
      textClass = colors.text;
    } else {
      // 處理數碼寶貝標籤
      if (detectedCategory === 'type') {
        // 類型標籤 - 藍色
        const colors = digimonTypeDetailColorMap[normalizedKey] || digimonTypeDetailColorMap['unknown'];
        backgroundClass = colors.bg;
        textClass = colors.text;
      } else if (detectedCategory === 'attribute') {
        // 屬性標籤 - 依屬性變色
        const colors = digimonAttributeDetailColorMap[normalizedKey] || digimonAttributeDetailColorMap['unknown'];
        backgroundClass = colors.bg;
        textClass = colors.text;
      } else if (detectedCategory === 'field') {
        // 屬域標籤 - 靛藍色
        const colors = digimonFieldDetailColorMap[normalizedKey] || digimonFieldDetailColorMap['unknown'];
        backgroundClass = colors.bg;
        textClass = colors.text;
      } else {
        // 等級標籤 - 灰色
        const colors = digimonLevelDetailColorMap[normalizedKey] || digimonLevelDetailColorMap['unknown'];
        backgroundClass = colors.bg;
        textClass = colors.text;
      }
    }
  }

  return (
    <span 
      className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        backgroundClass,
        textClass,
        isDetail && 'border',
        isDetail && borderClass,
        className
      )}
    >
      {children}
    </span>
  );
};

export default Tag; 