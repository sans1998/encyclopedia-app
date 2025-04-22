import React from 'react';
import { cn } from '../utils/classNames';
import Card from './Card';

interface Stat {
  name: string;
  value: number;
  maxValue?: number;
}

interface DetailViewProps {
  name: string;
  image: string;
  types: string[];
  description?: string;
  stats?: Stat[];
  attributes?: Record<string, string | number>;
  className?: string;
}

const DetailView: React.FC<DetailViewProps> = ({
  name,
  image,
  types,
  description,
  stats = [],
  attributes = {},
  className,
}) => {
  return (
    <Card className={cn('overflow-hidden', className)} variant="elevated">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 圖片和基本信息區域 */}
        <div className="flex flex-col items-center p-6 bg-gray-50">
          <div className="w-full max-w-sm aspect-square flex items-center justify-center mb-4">
            <img
              src={image}
              alt={name}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {types.map((type) => (
              <span
                key={type}
                className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {type}
              </span>
            ))}
          </div>
          {description && <p className="text-gray-600 text-center">{description}</p>}
        </div>

        {/* 詳細數據區域 */}
        <div className="p-6">
          {/* 屬性 */}
          {Object.keys(attributes).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200">屬性</h2>
              <dl className="grid grid-cols-2 gap-3">
                {Object.entries(attributes).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="mt-1 text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* 數據統計 */}
          {stats.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200">數據統計</h2>
              <div className="space-y-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{stat.name}</span>
                      <span className="text-sm text-gray-600">
                        {stat.value}/{stat.maxValue || 100}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${(stat.value / (stat.maxValue || 100)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DetailView; 