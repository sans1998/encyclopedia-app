import DigimonDetail from './DigimonDetail';
import { use } from 'react';

export default function DigimonPage({ params }: { params: Promise<{ id: string }> }) {
  // 在服務器端使用 use() 解包 params
  const resolvedParams = use(params);
  
  return <DigimonDetail id={resolvedParams.id} />;
} 