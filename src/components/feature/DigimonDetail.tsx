'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loading from '@/components/ui/Loading';
import { getDigimonDetail } from '@/services/digimonService';
import { Digimon } from '@/types';
import {
  digimonAttributeDetailColorMap,
  errorMessages,
  cssClasses
} from '@/utils/constants';

type DigimonDetailProps = {
  id: string;
};

export default function DigimonDetail({ id }: DigimonDetailProps) {
  const router = useRouter();
  const [digimon, setDigimon] = useState<Digimon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDigimonDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDigimonDetail(id);
        setDigimon(data);
      } catch (err) {
        console.error('獲取數碼寶貝詳情時出錯:', err);
        setError(errorMessages.DIGIMON_DETAIL_ERROR);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDigimonDetail();
  }, [id]);
  
  const goBack = () => {
    router.back();
  };
  
  // 獲取英文描述或默認第一個
  const getEnglishDescription = (digimon: Digimon) => {
    const englishDesc = digimon.descriptions.find(desc => desc.language === 'en');
    return englishDesc?.description || digimon.descriptions[0]?.description || '';
  };
  
  return (
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className={cssClasses.errorBox}>
            <p>{error}</p>
            <button 
              onClick={goBack} 
              className={cssClasses.detailReturnButton}
            >
              返回
            </button>
          </div>
        ) : digimon ? (
          <div>
            <button 
              onClick={goBack}
              className={cssClasses.backButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              返回列表
            </button>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                    <div className="relative w-64 h-64">
                      {digimon.images && digimon.images.length > 0 ? (
                        <Image
                          src={digimon.images[0].href}
                          alt={digimon.name}
                          fill
                          style={{ objectFit: 'contain' }}
                          priority
                        />
                      ) : (
                        <div className={cssClasses.noImageContainer}>
                          <span className={cssClasses.noImageText}>無圖片</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-8">
                    <div className="flex items-end mb-4">
                      <h1 className="text-3xl font-bold capitalize text-gray-800 mr-3">
                        {digimon.name}
                      </h1>
                      <span className="text-xl text-gray-500">
                        #{digimon.id.toString().padStart(3, '0')}
                      </span>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2 text-gray-700">類型與屬性</h2>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {digimon.types.map((typeInfo, index) => (
                          <span 
                            key={`type-${index}`}
                            className={`${cssClasses.typeBadgeDetail} bg-blue-500 text-white`}
                          >
                            {typeInfo.type}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {digimon.attributes.map((attrInfo, index) => {
                          const attr = attrInfo.attribute.toLowerCase();
                          const colors = digimonAttributeDetailColorMap[attr] || { 
                            bg: 'bg-gray-300', 
                            border: 'border-gray-400', 
                            text: 'text-gray-800' 
                          };
                          
                          return (
                            <span 
                              key={`attr-${index}`}
                              className={`${cssClasses.typeBadgeDetail} ${colors.bg} ${colors.border} ${colors.text} border`}
                            >
                              {attrInfo.attribute}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2 text-gray-700">等級</h2>
                      <div className="flex flex-wrap gap-2">
                        {digimon.levels.map((levelInfo, index) => (
                          <span 
                            key={index}
                            className={`${cssClasses.typeBadgeDetail} bg-gray-200 text-gray-800`}
                          >
                            {levelInfo.level}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2 text-gray-700">屬域</h2>
                      <div className="flex flex-wrap gap-2">
                        {digimon.fields.map((fieldInfo, index) => (
                          <span 
                            key={index}
                            className={`${cssClasses.typeBadgeDetail} bg-indigo-100 text-indigo-800`}
                          >
                            {fieldInfo.field}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-2 text-gray-700">描述</h2>
                      <p className="text-gray-600">
                        {getEnglishDescription(digimon)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-800">{errorMessages.NO_DIGIMON_FOUND}</p>
            <button 
              onClick={goBack} 
              className={cssClasses.detailReturnButton}
            >
              返回列表
            </button>
          </div>
        )}
      </main>
  );
} 