import type { Preview } from '@storybook/react'
import '../src/app/globals.css'; // 確保Tailwind樣式被導入

// 用於自動修復 className.split 錯誤的解決方案
const fixClassNameSplitError = () => {
  // 在頁面載入後執行
  if (typeof window !== 'undefined') {
    const originalGetElementsByClassName = document.getElementsByClassName;
    
    // 替換 document.getElementsByClassName 方法以返回安全的結果
    document.getElementsByClassName = function(classNames: string) {
      try {
        // 嘗試使用原始方法
        return originalGetElementsByClassName.call(this, classNames);
      } catch (error) {
        // 如果發生錯誤，返回空的 HTMLCollection
        console.warn('Error in getElementsByClassName:', error);
        return document.querySelectorAll(`.${classNames}`);
      }
    };
  }
};

// 運行修復
fixClassNameSplitError();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    // 禁用可能導致問題的功能
    pseudo: { disable: true }
  },
};

export default preview;