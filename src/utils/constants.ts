// 顏色常數定義
import { HttpStatusCode } from '@/types';

// 寶可夢類型顏色映射
export const pokemonTypeColorMap: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

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

// 數碼寶貝類型顏色映射
export const digimonTypeColorMap: Record<string, string> = {
  free: 'bg-green-300',
  vaccine: 'bg-blue-300',
  virus: 'bg-red-300',
  data: 'bg-purple-300',
  unknown: 'bg-gray-300',
};

// 數碼寶貝屬性詳細顏色映射 (用於詳情頁)
export const digimonAttributeDetailColorMap: Record<string, { bg: string; border: string; text: string }> = {
  vaccine: { bg: 'bg-blue-400', border: 'border-blue-500', text: 'text-white' },
  virus: { bg: 'bg-purple-400', border: 'border-purple-500', text: 'text-white' },
  data: { bg: 'bg-green-400', border: 'border-green-500', text: 'text-white' },
  free: { bg: 'bg-yellow-400', border: 'border-yellow-500', text: 'text-yellow-900' },
  unknown: { bg: 'bg-gray-400', border: 'border-gray-500', text: 'text-white' }
};

// 數碼寶貝屬性背景漸層顏色
export const digimonAttributeGradients: Record<string, string> = {
  vaccine: 'from-blue-100 to-blue-200',
  virus: 'from-purple-100 to-purple-200',
  data: 'from-green-100 to-green-200',
  free: 'from-yellow-50 to-yellow-200',
  unknown: 'from-gray-100 to-gray-200',
};

// 數碼寶貝等級顏色
export const digimonLevelColorMap: Record<string, string> = {
  rookie: 'bg-green-400',
  champion: 'bg-blue-400',
  ultimate: 'bg-purple-400',
  mega: 'bg-red-400',
  armor: 'bg-yellow-400',
  training: 'bg-gray-400',
  'in-training': 'bg-gray-400',
  fresh: 'bg-gray-300',
  'ultra': 'bg-pink-500',
  'hybrid': 'bg-indigo-500',
  unknown: 'bg-gray-300',
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