import {DigimonDetail} from '@/components';

export default async function DigimonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <DigimonDetail id={id} />;
} 