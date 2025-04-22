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

export const Default: Story = {
  args: {},
}; 