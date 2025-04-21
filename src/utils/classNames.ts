/**
 * 將多個類名組合成一個類名字符串，移除空值和假值
 * 
 * @param classes 要組合的類名列表
 * @returns 組合後的類名字符串
 * 
 * @example
 * cn('text-red-500', undefined, null, false, 'bg-blue-500')
 * // => 'text-red-500 bg-blue-500'
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default cn; 