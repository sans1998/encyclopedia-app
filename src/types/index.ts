// API 響應類型
export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

// 導出所有模塊
export * from './pokemon';
export * from './digimon';
export * from './http';
export * from './ui';
export * from './creatures';