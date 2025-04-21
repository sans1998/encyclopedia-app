import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from '../components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<ButtonProps> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: '按鈕的視覺變體樣式',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '按鈕尺寸大小',
    },
    isLoading: {
      control: 'boolean',
      description: '是否顯示加載中狀態',
    },
    isFullWidth: {
      control: 'boolean',
      description: '是否佔滿容器寬度',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用按鈕',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: '主要按鈕',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: '次要按鈕',
    variant: 'secondary',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    children: '輪廓按鈕',
    variant: 'outline',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    children: '幽靈按鈕',
    variant: 'ghost',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: '小號按鈕',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: '中號按鈕',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: '大號按鈕',
    size: 'lg',
  },
};

export const Loading: Story = {
  args: {
    children: '加載中...',
    isLoading: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: '全寬按鈕',
    isFullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '禁用按鈕',
    disabled: true,
  },
};
