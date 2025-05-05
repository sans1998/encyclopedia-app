/**
 * 格式化生物的 ID 為固定格式（例如：#0001、#0002）
 * @param id 數字或字符串形式的 ID
 * @param padLength 補零後的總長度，默認為 4
 * @returns 格式化後的 ID 字符串
 */
export function formatId(id: number | string, padLength: number = 4): string {
  return `#${String(id).padStart(padLength, '0')}`;
} 