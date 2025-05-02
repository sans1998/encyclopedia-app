// API 響應類型
export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

export * from './pokemon';
export * from './digimon';
export * from './http';