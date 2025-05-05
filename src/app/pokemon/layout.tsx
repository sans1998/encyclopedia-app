import { MainLayout } from '@/layouts';

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 使用寶可夢黃色主題
  return (
    <MainLayout bgGradient="from-yellow-50 to-yellow-100">
      {children}
    </MainLayout>
  );
} 