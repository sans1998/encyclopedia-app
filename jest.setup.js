// 添加測試擴展
import '@testing-library/jest-dom';

// 設置測試環境變量
process.env.NEXT_PUBLIC_POKEMON_API_URL = 'https://pokeapi.co/api/v2';
process.env.NEXT_PUBLIC_DIGIMON_API_URL = 'https://digi-api.com/api/v1';

// 防止 console.error 輸出到測試結果中
global.console.error = jest.fn();

// 模擬 matchMedia (用於響應式測試)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}); 