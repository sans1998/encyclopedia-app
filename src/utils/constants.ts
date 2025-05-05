// 顏色常數定義
import { HttpStatusCode } from '@/types';

// 寶可夢類型詳細顏色映射 (用於詳情頁)
export const pokemonTypeDetailColorMap: Record<string, { bg: string; border: string; text: string }> = {
  normal: { bg: 'bg-gray-300', border: 'border-gray-400', text: 'text-gray-800' },
  fire: { bg: 'bg-red-400', border: 'border-red-500', text: 'text-white' },
  water: { bg: 'bg-blue-400', border: 'border-blue-500', text: 'text-white' },
  electric: { bg: 'bg-yellow-300', border: 'border-yellow-400', text: 'text-gray-800' },
  grass: { bg: 'bg-green-400', border: 'border-green-500', text: 'text-white' },
  ice: { bg: 'bg-blue-200', border: 'border-blue-300', text: 'text-blue-800' },
  fighting: { bg: 'bg-red-600', border: 'border-red-700', text: 'text-white' },
  poison: { bg: 'bg-purple-400', border: 'border-purple-500', text: 'text-white' },
  ground: { bg: 'bg-yellow-600', border: 'border-yellow-700', text: 'text-white' },
  flying: { bg: 'bg-indigo-300', border: 'border-indigo-400', text: 'text-indigo-900' },
  psychic: { bg: 'bg-pink-400', border: 'border-pink-500', text: 'text-white' },
  bug: { bg: 'bg-green-400', border: 'border-green-500', text: 'text-white' },
  rock: { bg: 'bg-yellow-700', border: 'border-yellow-800', text: 'text-white' },
  ghost: { bg: 'bg-purple-600', border: 'border-purple-700', text: 'text-white' },
  dragon: { bg: 'bg-indigo-600', border: 'border-indigo-700', text: 'text-white' },
  dark: { bg: 'bg-gray-700', border: 'border-gray-800', text: 'text-white' },
  steel: { bg: 'bg-gray-400', border: 'border-gray-500', text: 'text-white' },
  fairy: { bg: 'bg-pink-300', border: 'border-pink-400', text: 'text-pink-900' }
};

// 寶可夢類型背景漸層顏色
export const pokemonTypeGradients: Record<string, string> = {
  normal: 'from-gray-200 to-gray-300',
  fire: 'from-red-200 to-orange-300',
  water: 'from-blue-200 to-blue-300',
  electric: 'from-yellow-100 to-yellow-300',
  grass: 'from-green-200 to-green-300',
  ice: 'from-blue-100 to-cyan-200',
  fighting: 'from-red-300 to-red-400',
  poison: 'from-purple-200 to-purple-300',
  ground: 'from-yellow-200 to-yellow-400',
  flying: 'from-indigo-100 to-blue-200',
  psychic: 'from-pink-200 to-pink-300',
  bug: 'from-lime-200 to-green-200',
  rock: 'from-yellow-300 to-yellow-500',
  ghost: 'from-purple-300 to-indigo-400',
  dragon: 'from-indigo-300 to-blue-400',
  dark: 'from-gray-600 to-gray-700',
  steel: 'from-gray-300 to-gray-400',
  fairy: 'from-pink-100 to-pink-200'
};

// 數碼寶貝屬性詳細顏色映射 (用於詳情頁)
export const digimonAttributeDetailColorMap: Record<string, { bg: string; border: string; text: string }> = {
  vaccine: { bg: 'bg-blue-400', border: 'border-blue-500', text: 'text-white' },
  virus: { bg: 'bg-purple-400', border: 'border-purple-500', text: 'text-white' },
  data: { bg: 'bg-green-400', border: 'border-green-500', text: 'text-white' },
  free: { bg: 'bg-yellow-400', border: 'border-yellow-500', text: 'text-yellow-900' },
  unknown: { bg: 'bg-gray-400', border: 'border-gray-500', text: 'text-white' }
};

// 數碼寶貝類型詳細顏色映射 (用於詳情頁)
export const digimonTypeDetailColorMap: Record<string, { bg: string; border: string; text: string }> = {
  'beast': { bg: 'bg-amber-500', border: 'border-amber-600', text: 'text-white' },
  'bird': { bg: 'bg-sky-500', border: 'border-sky-600', text: 'text-white' },
  'machine': { bg: 'bg-slate-500', border: 'border-slate-600', text: 'text-white' },
  'mammal': { bg: 'bg-orange-500', border: 'border-orange-600', text: 'text-white' },
  'reptile': { bg: 'bg-lime-500', border: 'border-lime-600', text: 'text-white' },
  'dragon': { bg: 'bg-red-500', border: 'border-red-600', text: 'text-white' },
  'fish': { bg: 'bg-cyan-500', border: 'border-cyan-600', text: 'text-white' },
  'holy beast': { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-white' },
  'holy-beast': { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-white' },
  'insect': { bg: 'bg-green-500', border: 'border-green-600', text: 'text-white' },
  'unknown': { bg: 'bg-gray-500', border: 'border-gray-600', text: 'text-white' },
};

// 數碼寶貝等級詳細顏色映射 (用於詳情頁)
export const digimonLevelDetailColorMap: Record<string, { bg: string; border: string; text: string }> = {
  'rookie': { bg: 'bg-gray-200', border: 'border-gray-300', text: 'text-gray-800' },
  'champion': { bg: 'bg-gray-200', border: 'border-gray-300', text: 'text-gray-800' },
  'ultimate': { bg: 'bg-gray-200', border: 'border-gray-300', text: 'text-gray-800' },
  'mega': { bg: 'bg-gray-200', border: 'border-gray-300', text: 'text-gray-800' },
  'armor': { bg: 'bg-gray-200', border: 'border-gray-300', text: 'text-gray-800' },
  'training': { bg: 'bg-gray-200', border: 'border-gray-300', text: 'text-gray-800' },
  'fresh': { bg: 'bg-gray-200', border: 'border-gray-300', text: 'text-gray-800' },
  'in-training': { bg: 'bg-gray-200', border: 'border-gray-300', text: 'text-gray-800' },
  'hybrid': { bg: 'bg-gray-200', border: 'border-gray-300', text: 'text-gray-800' },
  'unknown': { bg: 'bg-gray-200', border: 'border-gray-300', text: 'text-gray-800' },
};

// 數碼寶貝屬域詳細顏色映射 (用於詳情頁)
export const digimonFieldDetailColorMap: Record<string, { bg: string; border: string; text: string }> = {
  'adventure': { bg: 'bg-indigo-100', border: 'border-indigo-200', text: 'text-indigo-800' },
  'deep savers': { bg: 'bg-indigo-100', border: 'border-indigo-200', text: 'text-indigo-800' },
  'nature spirits': { bg: 'bg-indigo-100', border: 'border-indigo-200', text: 'text-indigo-800' },
  'virus busters': { bg: 'bg-indigo-100', border: 'border-indigo-200', text: 'text-indigo-800' },
  'metal empire': { bg: 'bg-indigo-100', border: 'border-indigo-200', text: 'text-indigo-800' },
  'unknown': { bg: 'bg-indigo-100', border: 'border-indigo-200', text: 'text-indigo-800' },
};

// 數碼寶貝等級背景漸層顏色
export const digimonLevelGradients: Record<string, string> = {
  rookie: 'from-green-200 to-green-300',
  champion: 'from-blue-200 to-blue-300',
  ultimate: 'from-purple-200 to-purple-300',
  mega: 'from-red-200 to-red-300',
  armor: 'from-yellow-200 to-yellow-300',
  training: 'from-gray-200 to-gray-300',
  fresh: 'from-pink-100 to-pink-200',
  'in-training': 'from-teal-100 to-teal-200',
  hybrid: 'from-indigo-200 to-indigo-300'
};

// 數碼寶貝類型背景漸層顏色
export const digimonTypeGradients: Record<string, string> = {
  'beast': 'from-amber-200 to-amber-300',
  'bird': 'from-sky-200 to-sky-300',
  'machine': 'from-slate-200 to-slate-300',
  'mammal': 'from-orange-200 to-orange-300',
  'reptile': 'from-lime-200 to-lime-300',
  'dragon': 'from-red-200 to-red-300',
  'fish': 'from-cyan-200 to-cyan-300',
  'holy beast': 'from-yellow-100 to-yellow-200',
  'holy-beast': 'from-yellow-100 to-yellow-200',
  'insect': 'from-green-200 to-green-300',
  'unknown': 'from-gray-200 to-gray-300'
};

// 數碼寶貝屬性背景漸層顏色
export const digimonAttributeGradients: Record<string, string> = {
  'vaccine': 'from-blue-200 to-blue-300',
  'virus': 'from-purple-200 to-purple-300',
  'data': 'from-green-200 to-green-300',
  'free': 'from-yellow-200 to-yellow-300',
  'unknown': 'from-gray-200 to-gray-300'
};

// 百科全書類型及路徑
export const encyclopediaTypes = {
  POKEMON: 'pokemon',
  DIGIMON: 'digimon'
};

// 百科全書路徑映射
export const encyclopediaPathMap: Record<string, string> = {
  [encyclopediaTypes.POKEMON]: '/pokemon',
  [encyclopediaTypes.DIGIMON]: '/digimon'
};

// 每頁顯示數量
export const ITEMS_PER_PAGE = 20; 

// HTTP 狀態碼錯誤訊息
export const HttpStatusMessages: Record<number, string> = {
  [HttpStatusCode.BAD_REQUEST]: '請求格式不正確',
  [HttpStatusCode.UNAUTHORIZED]: '需要身份驗證',
  [HttpStatusCode.FORBIDDEN]: '沒有存取權限',
  [HttpStatusCode.NOT_FOUND]: '找不到請求的資源',
  [HttpStatusCode.METHOD_NOT_ALLOWED]: '請求方法不被允許',
  [HttpStatusCode.REQUEST_TIMEOUT]: '請求超時',
  [HttpStatusCode.CONFLICT]: '資源衝突',
  [HttpStatusCode.UNPROCESSABLE_ENTITY]: '請求格式正確但語義錯誤',
  [HttpStatusCode.TOO_MANY_REQUESTS]: '請求過於頻繁',
  [HttpStatusCode.INTERNAL_SERVER_ERROR]: '伺服器內部錯誤',
  [HttpStatusCode.BAD_GATEWAY]: '網關錯誤',
  [HttpStatusCode.SERVICE_UNAVAILABLE]: '服務暫時不可用',
  [HttpStatusCode.GATEWAY_TIMEOUT]: '網關超時',
  [HttpStatusCode.NETWORK_ERROR]: '網路連接錯誤'
};

// 通用錯誤訊息
export const errorMessages = {
  LOAD_POKEMON_FAILED: '加載寶可夢數據失敗',
  LOAD_DIGIMON_FAILED: '加載數碼寶貝數據失敗',
  FETCH_DATA_ERROR: '獲取數據時出錯',
  NO_POKEMON_DATA: '無法獲取寶可夢數據',
  NO_DIGIMON_DATA: '無法獲取數碼寶貝數據',
  POKEMON_DETAIL_ERROR: '無法加載寶可夢詳情。請稍後再試。',
  DIGIMON_DETAIL_ERROR: '無法加載數碼寶貝詳情。請稍後再試。',
  NO_POKEMON_FOUND: '未找到寶可夢資料',
  NO_DIGIMON_FOUND: '未找到數碼寶貝資料'
};

// 常用CSS類名
export const cssClasses = {
  cardHover: 'block transform transition hover:scale-105',
  typeBadge: 'text-xs bg-white bg-opacity-50 rounded-full px-2 py-1 inline-block',
  levelBadge: 'text-xs bg-white bg-opacity-50 rounded-full px-2 py-1 mt-1 inline-block',
  errorBox: 'text-center text-red-500 p-8 bg-red-50 rounded-lg',
  returnButton: 'mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 inline-block',
  loadingOverlay: 'absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10',
  detailReturnButton: 'mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600',
  backButton: 'mb-6 flex items-center text-blue-600 hover:text-blue-800',
  typeBadgeDetail: 'type-badge',
  noImageContainer: 'w-full h-full flex items-center justify-center bg-gray-200 rounded-md',
  noImageText: 'text-gray-500'
};

// 網格佈局常數
export const gridConfig = {
  default: 'grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6',
  small: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3',
};

// 寶可夢狀態名稱映射
export const pokemonStatNameMap: Record<string, string> = {
  'hp': 'HP',
  'attack': '攻擊',
  'defense': '防禦',
  'special-attack': '特攻',
  'special-defense': '特防',
  'speed': '速度'
}; 