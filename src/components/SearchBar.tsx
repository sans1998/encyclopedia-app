"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '../utils/classNames';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  initialValue?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  placeholder = '搜索寶可夢或數碼寶貝...',
  initialValue = '',
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim());
      } else {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('flex w-full max-w-md', className)}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-grow px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        搜索
      </button>
    </form>
  );
};

export default SearchBar; 