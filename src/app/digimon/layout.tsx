import { MainLayout } from '@/layouts';

export default function DigimonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 使用數碼寶貝藍色主題
  return (
    <MainLayout bgGradient="from-blue-50 to-blue-100">
      {children}
    </MainLayout>
  );
} 