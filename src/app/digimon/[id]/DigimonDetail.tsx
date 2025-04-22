'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { getDigimonDetail } from '@/services/digimonService';
import { Digimon } from '@/types';

// 屬性顏色映射
const attributeColorMap: Record<string, { bg: string; border: string; text: string }> = {
  vaccine: { bg: 'bg-blue-400', border: 'border-blue-500', text: 'text-white' },
  virus: { bg: 'bg-purple-400', border: 'border-purple-500', text: 'text-white' },
  data: { bg: 'bg-green-400', border: 'border-green-500', text: 'text-white' },
  free: { bg: 'bg-yellow-400', border: 'border-yellow-500', text: 'text-yellow-900' },
  unknown: { bg: 'bg-gray-400', border: 'border-gray-500', text: 'text-white' }
};

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
        setError('無法加載數碼寶貝詳情。請稍後再試。');
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={goBack} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              返回
            </button>
          </div>
        ) : digimon ? (
          <div>
            <button 
              onClick={goBack}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
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
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
                          <span className="text-gray-500">無圖片</span>
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
                            className="type-badge bg-blue-500 text-white"
                          >
                            {typeInfo.type}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {digimon.attributes.map((attrInfo, index) => {
                          const attr = attrInfo.attribute.toLowerCase();
                          const colors = attributeColorMap[attr] || { 
                            bg: 'bg-gray-300', 
                            border: 'border-gray-400', 
                            text: 'text-gray-800' 
                          };
                          
                          return (
                            <span 
                              key={`attr-${index}`}
                              className={`type-badge ${colors.bg} ${colors.border} ${colors.text} border`}
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
                            className="type-badge bg-gray-200 text-gray-800"
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
                            className="type-badge bg-indigo-100 text-indigo-800"
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
            <p className="text-gray-800">未找到數碼寶貝資料</p>
            <button 
              onClick={goBack} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              返回列表
            </button>
          </div>
        )}
      </main>
    </div>
  );
} 