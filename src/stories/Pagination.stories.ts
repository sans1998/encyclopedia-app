import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Pagination from '../components/Pagination';

const meta = {
  title: 'App/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onPageChange: fn() },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
  },
}; 