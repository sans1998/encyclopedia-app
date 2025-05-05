'use client';

import { withCreatureList } from '@/components/hoc/withCreatureList';
import { createDigimonCard } from '@/components/hoc/withCreatureCard';
import { Digimon } from '@/types';

interface DigimonListData {
    digimonList: Digimon[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
}

// 創建特定於數碼寶貝的列表組件
const DigimonListComponent = withCreatureList<Digimon, DigimonListData>();

interface DigimonListProps {
  initialData: DigimonListData;
  initialPage: number;
}

export default function DigimonList({ initialData, initialPage }: DigimonListProps) {
  return (
    <DigimonListComponent
      initialData={initialData}
      initialPage={initialPage}
      apiEndpoint="/api/digimon/page"
      dataKey="digimonList"
      renderItem={(digimon) => createDigimonCard(digimon)}
    />
  );
} 