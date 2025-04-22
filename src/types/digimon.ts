// Digimon API 類型定義

// 數碼寶貝類型
export interface DigimonType {
  id: number;
  type: string;
}

// 數碼寶貝等級
export interface DigimonLevel {
  id: number;
  level: string;
}

// 數碼寶貝屬性
export interface DigimonAttribute {
  id: number;
  attribute: string;
}

// 數碼寶貝領域
export interface DigimonField {
  id: number;
  field: string;
  image: string;
}

// 數碼寶貝描述
export interface DigimonDescription {
  language: string;
  description: string;
}

// API返回的簡單數碼寶貝列表項
export interface DigimonListItem {
  id: number;
  name: string;
  href: string;
  image: string;
}

// 原始數碼寶貝數據結構
export interface RawDigimonData {
  id: number;
  name: string;
  images: { href: string; }[];
  types: DigimonType[];
  levels: DigimonLevel[];
  attributes: DigimonAttribute[];
  fields: DigimonField[];
  descriptions: DigimonDescription[];
  // 其他可能的屬性
  xAntibody?: boolean;
  prior_forms?: { name: string; href: string; }[];
  next_forms?: { name: string; href: string; }[];
  partners?: { name: string; href: string; }[];
  debut?: string;
  skills?: { name: string; description: string; }[];
}

// 數碼寶貝標準化數據結構
export interface Digimon {
  id: number;
  name: string;
  images: {
    href: string;
  }[];
  levels: DigimonLevel[];
  types: DigimonType[];
  attributes: DigimonAttribute[];
  fields: DigimonField[];
  descriptions: DigimonDescription[];
  // 其他可選屬性
  xAntibody?: boolean;
  prior_forms?: { name: string; href: string; }[];
  next_forms?: { name: string; href: string; }[];
  partners?: { name: string; href: string; }[];
  skills?: { name: string; description: string; }[];
}

// 簡化版數碼寶貝，用於列表顯示
export interface SimpleDigimon {
  id: number;
  name: string;
  image: string;
  href: string;
}

// 數碼寶貝列表響應
export interface DigimonListResponse {
  content: Array<Digimon | SimpleDigimon>;
  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
    previousPage: string | null;
    nextPage: string | null;
  };
} 