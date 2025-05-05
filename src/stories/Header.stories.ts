import type { Meta, StoryObj } from '@storybook/react';
import {Header} from '@/components';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};

export const CustomClassName: Story = {
  args: {
    className: 'bg-blue-600 text-white shadow-lg',
  },
};
