import dynamic from 'next/dynamic';

// 動態導入客戶端組件
const PokemonDetail = dynamic(() => import('./PokemonDetail'), { 
  loading: () => <div className="flex justify-center items-center min-h-screen">加載中...</div>
});

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PokemonPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
      <PokemonDetail id={id} />
    </div>
  );
}