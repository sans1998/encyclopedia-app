import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components';
import { cssClasses } from '@/utils/constants';
import CreatureDetail from '@/components/ui/CreatureDetail';
import Tag from '@/components/common/Tag';
import { 
  CreatureType, 
  WithCreatureDetailConfig
} from '@/types';

// HOC 高階組件函數
export function withCreatureDetail<T extends { id: number | string; name: string }>(
  config: WithCreatureDetailConfig<T>
) {
  return function EnhancedCreatureDetail({ id }: { id: string }) {
    const router = useRouter();
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // 生物類型
    const { type } = config;
    
    useEffect(() => {
      const fetchCreatureData = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const result = await config.fetchData(id);
          setData(result);
        } catch (err) {
          console.error(`獲取${type === CreatureType.POKEMON ? '寶可夢' : '數碼寶貝'}詳情時出錯:`, err);
          setError(config.errorMessage);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCreatureData();
    }, [id, type]);
    
    const goBack = () => {
      router.back();
    };
    
    if (loading) {
      return <Loading />;
    }
    
    if (error) {
      return (
        <div className={cssClasses.errorBox}>
          <p>{error}</p>
          <button 
            onClick={goBack} 
            className={cssClasses.detailReturnButton}
          >
            返回
          </button>
        </div>
      );
    }
    
    if (!data) {
      return (
        <div className="text-center p-8">
          <p className="text-gray-800">{config.notFoundMessage}</p>
          <button 
            onClick={goBack} 
            className={cssClasses.detailReturnButton}
          >
            返回列表
          </button>
        </div>
      );
    }
    
    // 渲染標籤
    const renderedTags = config.getTags(data).map((tag, index) => (
      <Tag
        key={`${tag.label}-${index}`}
        colorKey={tag.colorKey}
        variant={tag.variant || (type === CreatureType.POKEMON ? 'pokemon' : 'digimon')}
        category={tag.category}
        isDetail={true}
      >
        {tag.label}
      </Tag>
    ));
    
    // 獲取描述
    const description = config.getDescription(data);
    
    // 獲取統計數據
    const stats = config.getStats ? config.getStats(data) : [];
    
    // 獲取屬性分組
    const attributeGroups = config.getAttributeGroups ? config.getAttributeGroups(data) : [];
    
    // 渲染詳情組件
    return (
      <CreatureDetail
        id={data.id}
        name={data.name}
        imageUrl={config.getImageUrl(data)}
        tags={renderedTags}
        description={description}
        stats={stats}
        attributeGroups={attributeGroups}
        variant={type === CreatureType.POKEMON ? 'pokemon' : 'digimon'}
        onBack={goBack}
      />
    );
  };
} 