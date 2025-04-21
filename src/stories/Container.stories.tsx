import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Container from '../components/Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: '容器的最大寬度',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

// 創建不同容器尺寸的演示內容
const DemoContent = () => (
  <div className="bg-blue-100 p-4 border border-blue-300 rounded-md">
    <p className="text-center text-blue-800">容器內容區域</p>
  </div>
);

export const Small: Story = {
  args: {
    size: 'sm',
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '小尺寸容器，最大寬度為 640px。',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '中等尺寸容器，最大寬度為 768px。',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '大尺寸容器，最大寬度為 1024px。這是默認尺寸。',
      },
    },
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '特大尺寸容器，最大寬度為 1280px。',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    size: 'full',
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '全寬容器，沒有最大寬度限制，但仍然有水平內邊距。',
      },
    },
  },
};

export const NestedContainers: Story = {
  render: () => (
    <Container size="xl" className="p-4 bg-gray-100">
      <p className="mb-4 text-center">外層容器 (xl)</p>
      <Container size="md" className="p-4 bg-gray-200">
        <p className="mb-4 text-center">中層容器 (md)</p>
        <Container size="sm" className="p-4 bg-gray-300">
          <p className="text-center">內層容器 (sm)</p>
        </Container>
      </Container>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示容器的嵌套使用。',
      },
    },
  },
}; 