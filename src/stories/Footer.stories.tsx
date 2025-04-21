import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Footer from '../components/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};

export const CustomClassName: Story = {
  args: {
    className: 'bg-gray-800 text-white border-gray-700',
  },
}; 