'use client';

import { withCreatureList } from '@/components/hoc/withCreatureList';
import { createPokemonCard } from '@/components/hoc/withCreatureCard';
import { Pokemon } from '@/types';

interface PokemonListData {
  pokemonList: Pokemon[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

// 創建特定於寶可夢的列表組件
const PokemonListComponent = withCreatureList<Pokemon, PokemonListData>();

interface PokemonListProps {
  initialData: PokemonListData;
  initialPage: number;
}

export default function PokemonList({ initialData, initialPage }: PokemonListProps) {
  return (
    <PokemonListComponent
      initialData={initialData}
      initialPage={initialPage}
      apiEndpoint="/api/pokemon/page"
      dataKey="pokemonList"
      renderItem={(pokemon) => createPokemonCard(pokemon)}
    />
  );
} 