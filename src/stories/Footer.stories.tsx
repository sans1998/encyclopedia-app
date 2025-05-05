import type { Meta, StoryObj } from '@storybook/react';
import {Footer} from '@/components';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomClassName: Story = {
  args: {
    className: 'bg-gray-800 text-white border-gray-700',
  },
}; 