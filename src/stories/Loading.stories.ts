import type { Meta, StoryObj } from '@storybook/react';
import Loading from '../components/Loading';

const meta = {
  title: 'App/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本加載
export const Default: Story = {
  args: {},
};

// 小尺寸
export const Small: Story = {
  args: {
    size: 'small',
  },
};

// 大尺寸
export const Large: Story = {
  args: {
    size: 'large',
  },
};

// 次要顏色
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

// 帶有文字的加載
export const WithText: Story = {
  args: {
    text: '載入中，請稍候...',
  },
};

// 全頁面加載覆蓋
export const FullPage: Story = {
  args: {
    fullPage: true,
    text: '資料載入中',
  },
  parameters: {
    layout: 'fullscreen',
  },
}; 