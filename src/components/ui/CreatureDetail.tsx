import React from 'react';
import { cn } from '@/utils/classNames';
import Image from 'next/image';
import { formatId } from '@/utils/formatters';
import { CreatureDetailProps } from '@/types';

const CreatureDetail: React.FC<CreatureDetailProps> = ({
  id,
  name,
  imageUrl,
  tags,
  description,
  stats = [],
  attributeGroups = [],
  variant = 'pokemon',
  className,
  onBack
}) => {
  return (
    <main className="container mx-auto px-4 py-8">
      {onBack && (
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          返回列表
        </button>
      )}
      
      <div className={cn('bg-white rounded-xl shadow-lg overflow-hidden', className)}>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row">
            {/* 左側圖片區域 */}
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="relative w-64 h-64">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={name}
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
            
            {/* 右側詳細信息區域 */}
            <div className="md:w-2/3 md:pl-8">
              <div className="flex items-end mb-4">
                <h1 className="text-3xl font-bold capitalize text-gray-800 mr-3">
                  {name}
                </h1>
                <span className="text-xl text-gray-500">
                  {formatId(id)}
                </span>
              </div>

              {/* 寶可夢的標籤直接顯示 */}
              {variant === 'pokemon' && tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {tags}
                </div>
              )}
              
              {/* 數碼寶貝需要分組顯示標籤 */}
              {variant === 'digimon' && tags.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-gray-700">類型與屬性</h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags}
                  </div>
                </div>
              )}
              
              {/* 屬性分組區域 */}
              {attributeGroups.map((group, groupIndex) => (
                <div key={`group-${groupIndex}`} className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-gray-700">{group.title}</h2>
                  {group.layout === 'list' ? (
                    <ul className="list-disc list-inside text-gray-600">
                      {group.attributes.map((attr, attrIndex) => (
                        <li key={`attr-${attrIndex}`} className="capitalize">
                          {attr.value}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {group.attributes.map((attr, attrIndex) => (
                        <div key={`attr-${attrIndex}`}>
                          <p className="text-gray-600 mb-1">{attr.key}: {attr.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* 描述區域 */}
              {description && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2 text-gray-700">描述</h2>
                  <p className="text-gray-600">{description}</p>
                </div>
              )}
              
              {/* 能力值區域 */}
              {stats.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3 text-gray-700">能力</h2>
                  <div className="space-y-3">
                    {stats.map((stat, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {stat.name}
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            {stat.value}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${stat.color || 'bg-yellow-500'} h-2 rounded-full`} 
                            style={{ width: `${Math.min(100, (stat.value / (stat.maxValue || 100)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreatureDetail; 