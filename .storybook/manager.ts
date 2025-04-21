import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: themes.dark,
  // 顯示工具欄
  showToolbar: true,
  // 顯示導航欄
  showNav: true,
  // 顯示面板（底部面板）
  showPanel: true,
  // 面板的默認位置
  panelPosition: 'bottom',
  // 啟用快捷鍵
  enableShortcuts: true,
  // 顯示搜索
  showSearch: true,
  // 顯示側邊欄
  showSidebar: true,
}); 