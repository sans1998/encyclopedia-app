import dynamic from 'next/dynamic';

// 動態導入客戶端組件
const PokemonDetail = dynamic(() => import('./PokemonDetail'), { 
  loading: () => <div className="flex justify-center items-center min-h-screen">加載中...</div>
});

export default async function PokemonPage({ params }: { params: { id: string } }) {
  const {id} = await params;

  return (
    <div>
      <PokemonDetail id={id} />
    </div>
  );
}