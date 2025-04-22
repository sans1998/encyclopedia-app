import DigimonDetail from './DigimonDetail';

export default async function DigimonPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return <DigimonDetail id={resolvedParams.id} />;
} 