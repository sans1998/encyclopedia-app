import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../utils/classNames';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="w-full bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">
          <Link href="/" className="hover:text-gray-300 transition">
            寶可夢 × 數碼寶貝圖鑑
          </Link>
        </h1>
        
        <nav className="flex space-x-4">
          <Link 
            href="/pokemon"
            className={cn(
              "rounded-md transition-colors p-2",
              pathname?.includes('/pokemon') 
                ? 'bg-red-500 text-white font-medium' 
                : 'hover:bg-gray-700'
            )}
          >
            寶可夢
          </Link>
          
          <Link 
            href="/digimon"
            className={cn(
              "rounded-md transition-colors p-2",
              pathname?.includes('/digimon') 
                ? 'bg-blue-500 text-white font-medium' 
                : 'hover:bg-gray-700'
            )}
          >
            數碼寶貝
          </Link>
        </nav>
      </div>
    </header>
  );
} 