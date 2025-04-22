'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { encyclopediaTypes } from '../utils/constants';
import { EntityContent } from '../services/encyclopediaService';

// Context 狀態類型
interface EncyclopediaContextState {
  currentType: string;
  entities: EntityContent[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  totalPages: number;
  totalItems: number;
}

// Context 操作類型
interface EncyclopediaContextActions {
  setCurrentType: (type: string) => void;
  setEntities: (entities: EntityContent[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
  setTotalItems: (totalItems: number) => void;
  resetState: () => void;
}

// 完整 Context 類型
type EncyclopediaContextType = EncyclopediaContextState & EncyclopediaContextActions;

// 默認值
const defaultState: EncyclopediaContextState = {
  currentType: encyclopediaTypes.POKEMON,
  entities: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  page: 0,
  totalPages: 1,
  totalItems: 0
};

// 創建 Context
const EncyclopediaContext = createContext<EncyclopediaContextType | undefined>(undefined);

// Provider 組件
export const EncyclopediaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<EncyclopediaContextState>(defaultState);

  // 操作函數
  const setCurrentType = useCallback((type: string) => {
    setState(prev => ({ ...prev, currentType: type }));
  }, []);

  const setEntities = useCallback((entities: EntityContent[]) => {
    setState(prev => ({ ...prev, entities }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const setPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, page }));
  }, []);

  const setTotalPages = useCallback((totalPages: number) => {
    setState(prev => ({ ...prev, totalPages }));
  }, []);

  const setTotalItems = useCallback((totalItems: number) => {
    setState(prev => ({ ...prev, totalItems }));
  }, []);

  const resetState = useCallback(() => {
    setState(prev => ({
      ...defaultState,
      currentType: prev.currentType // 保持當前類型不變
    }));
  }, []);

  // 合併狀態和操作
  const contextValue = useMemo(
    () => ({
      ...state,
      setCurrentType,
      setEntities,
      setLoading,
      setError,
      setSearchQuery,
      setPage,
      setTotalPages,
      setTotalItems,
      resetState
    }),
    [
      state,
      setCurrentType,
      setEntities,
      setLoading,
      setError,
      setSearchQuery,
      setPage,
      setTotalPages,
      setTotalItems,
      resetState
    ]
  );

  return (
    <EncyclopediaContext.Provider value={contextValue}>
      {children}
    </EncyclopediaContext.Provider>
  );
};

// 自定義Hook用於存取Context
export const useEncyclopedia = (): EncyclopediaContextType => {
  const context = useContext(EncyclopediaContext);
  
  if (context === undefined) {
    throw new Error('useEncyclopedia必須在EncyclopediaProvider內使用');
  }
  
  return context;
}; 