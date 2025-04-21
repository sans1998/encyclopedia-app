export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="relative w-20 h-20">
        {/* 旋轉的精靈球 */}
        <div className="absolute inset-0 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white w-4 h-4 rounded-full"></span>
        </div>
        
        {/* 上半部分紅色，下半部分白色的精靈球效果 */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-full border-2 border-gray-300">
          <div className="bg-red-500 h-1/2"></div>
          <div className="bg-white h-1/2"></div>
        </div>
      </div>
      
      <div className="ml-4 text-lg font-medium">載入中...</div>
    </div>
  );
} 