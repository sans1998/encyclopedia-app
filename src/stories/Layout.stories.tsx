import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Layout from '../components/Layout';
import Container from '../components/Container';

const meta: Meta<typeof Layout> = {
  title: 'Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    children: (
      <Container>
        <div className="py-10">
          <h1 className="text-2xl font-bold mb-4">頁面內容</h1>
          <p className="mb-4">這是一個使用 Layout 組件的示例頁面。</p>
          <p>
            Layout 組件包含了頁首和頁腳，並確保頁面內容至少佔滿整個視窗高度。
          </p>
        </div>
      </Container>
    ),
  },
};

export const WithoutHeader: Story = {
  args: {
    hideHeader: true,
    children: (
      <Container>
        <div className="py-10">
          <h1 className="text-2xl font-bold mb-4">無頁首布局</h1>
          <p>這個示例隱藏了頁首，只顯示主要內容和頁腳。</p>
        </div>
      </Container>
    ),
  },
};

export const WithoutFooter: Story = {
  args: {
    hideFooter: true,
    children: (
      <Container>
        <div className="py-10">
          <h1 className="text-2xl font-bold mb-4">無頁腳布局</h1>
          <p>這個示例隱藏了頁腳，只顯示頁首和主要內容。</p>
        </div>
      </Container>
    ),
  },
};

export const Minimal: Story = {
  args: {
    hideHeader: true,
    hideFooter: true,
    children: (
      <Container>
        <div className="py-10">
          <h1 className="text-2xl font-bold mb-4">極簡布局</h1>
          <p>這個示例同時隱藏了頁首和頁腳，只顯示主要內容。</p>
        </div>
      </Container>
    ),
  },
}; 