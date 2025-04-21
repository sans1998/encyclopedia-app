import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
          寶可夢 × 數碼寶貝圖鑑
        </h1>
        
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
          探索兩個經典系列的生物世界：寶可夢和數碼寶貝。瀏覽完整圖鑑，查看詳細資料，發現您最喜愛的角色！
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* 寶可夢卡片 */}
          <Link href="/pokemon">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-6 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-white mb-4">寶可夢</h2>
                <p className="text-yellow-100 mb-6 text-center">
                  瀏覽所有的寶可夢，從最初的一代到最新的世代。
                </p>
                <div className="bg-yellow-300 bg-opacity-30 p-4 rounded-lg">
                  <div className="relative w-40 h-40">
        <Image
                      src="/pokemon_logo.png"
                      alt="Pokemon"
                      fill
                      style={{ objectFit: 'contain' }}
          priority
        />
                  </div>
                </div>
              </div>
              <div className="bg-yellow-700 p-4 text-center">
                <span className="inline-block px-4 py-2 bg-white rounded-full text-yellow-700 font-medium hover:bg-yellow-50 transition-colors">
                  進入寶可夢圖鑑 &rarr;
                </span>
              </div>
            </div>
          </Link>
          
          {/* 數碼寶貝卡片 */}
          <Link href="/digimon">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-6 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-white mb-4">數碼寶貝</h2>
                <p className="text-blue-100 mb-6 text-center">
                  從初始階段到超級進化，探索數碼世界的所有生物。
                </p>
                <div className="bg-blue-300 bg-opacity-30 p-4 rounded-lg">
                  <div className="relative w-40 h-40">
            <Image
                      src="/digimon_logo.png"
                      alt="Digimon"
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </div>
                </div>
              </div>
              <div className="bg-blue-700 p-4 text-center">
                <span className="inline-block px-4 py-2 bg-white rounded-full text-blue-700 font-medium hover:bg-blue-50 transition-colors">
                  進入數碼寶貝圖鑑 &rarr;
                </span>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
