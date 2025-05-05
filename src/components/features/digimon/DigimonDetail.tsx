'use client';

import { withCreatureDetail } from '@/components/hoc/withCreatureDetail';
import { getDigimonDetail } from '@/services/digimonService';
import { errorMessages } from '@/utils/constants';
import { 
  CreatureType, 
  DigimonDetailData,
  AttributeGroup 
} from '@/types';

// 使用HOC創建增強的數碼寶貝詳情組件
const DigimonDetail = withCreatureDetail<DigimonDetailData>({
  type: CreatureType.DIGIMON,
  
  // 獲取數碼寶貝數據
  fetchData: async (id: string) => {
    const data = await getDigimonDetail(id);
    if (!data) throw new Error('Digimon not found');
    return data as DigimonDetailData;
  },
  
  // 錯誤訊息
  errorMessage: errorMessages.DIGIMON_DETAIL_ERROR,
  notFoundMessage: errorMessages.NO_DIGIMON_FOUND,
  
  // 獲取圖片URL
  getImageUrl: (digimon) => {
    return digimon.images && digimon.images.length > 0 
      ? digimon.images[0].href
      : null;
  },
  
  // 獲取標籤
  getTags: (digimon) => {
    const tags = [];
    
    // 添加類型標籤
    if (digimon.types && digimon.types.length > 0) {
      tags.push(...digimon.types.map(typeInfo => ({
        label: typeInfo.type,
        colorKey: typeInfo.type,
        category: 'type' as const,
        variant: 'digimon' as const
      })));
    }
    
    // 添加屬性標籤
    if (digimon.attributes && digimon.attributes.length > 0) {
      tags.push(...digimon.attributes.map(attrInfo => ({
        label: attrInfo.attribute,
        colorKey: attrInfo.attribute,
        category: 'attribute' as const,
        variant: 'digimon' as const
      })));
    }
    
    return tags;
  },
  
  // 獲取描述
  getDescription: (digimon) => {
    const englishDesc = digimon.descriptions.find(desc => desc.language === 'en');
    return englishDesc?.description || digimon.descriptions[0]?.description || '';
  },
  
  // 獲取屬性分組
  getAttributeGroups: (digimon) => {
    const groups: AttributeGroup[] = [];
    
    // 添加等級分組
    if (digimon.levels && digimon.levels.length > 0) {
      groups.push({
        title: '等級',
        attributes: digimon.levels.map(level => ({
          key: '等級',
          value: level.level
        })),
        layout: 'grid'
      });
    }
    
    // 添加屬域分組
    if (digimon.fields && digimon.fields.length > 0) {
      groups.push({
        title: '屬域',
        attributes: digimon.fields.map(field => ({
          key: '屬域',
          value: field.field
        })),
        layout: 'grid'
      });
    }
    
    return groups;
  }
});

export default DigimonDetail; 