import type { Meta, StoryObj } from '@storybook/react';
import Input, { InputProps } from '../components/Input';

const meta: Meta<InputProps> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '輸入框的標籤',
    },
    error: {
      control: 'text',
      description: '錯誤信息',
    },
    helperText: {
      control: 'text',
      description: '輔助說明文字',
    },
    fullWidth: {
      control: 'boolean',
      description: '是否佔滿容器寬度',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用輸入框',
    },
    placeholder: {
      control: 'text',
      description: '輸入框佔位文字',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '請輸入...',
  },
};

export const WithLabel: Story = {
  args: {
    label: '用戶名',
    placeholder: '請輸入用戶名',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '電子郵件',
    placeholder: '請輸入電子郵件',
    helperText: '我們不會將您的電子郵件分享給他人',
  },
};

export const WithError: Story = {
  args: {
    label: '密碼',
    type: 'password',
    value: '1234',
    error: '密碼必須至少包含6個字符',
  },
};

export const Disabled: Story = {
  args: {
    label: '用戶名',
    placeholder: '請輸入用戶名',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: '描述',
    placeholder: '請輸入描述',
    fullWidth: true,
  },
}; 