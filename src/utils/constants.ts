// 顏色常數定義

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

// 數碼寶貝類型顏色映射
export const digimonTypeColorMap: Record<string, string> = {
  free: 'bg-green-300',
  vaccine: 'bg-blue-300',
  virus: 'bg-red-300',
  data: 'bg-purple-300',
  unknown: 'bg-gray-300',
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