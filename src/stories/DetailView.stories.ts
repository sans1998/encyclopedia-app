import type { Meta, StoryObj } from '@storybook/react';
import DetailView from '../components/DetailView';

const meta = {
  title: 'App/DetailView',
  component: DetailView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DetailView>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本展示，只有必需的屬性
export const BasicView: Story = {
  args: {
    name: '皮卡丘',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['electric'],
  },
};

// 完整展示 - 包含所有可選屬性
export const FullView: Story = {
  args: {
    name: '皮卡丘',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['electric'],
    description: '皮卡丘是一種電氣鼠寶可夢，能夠釋放強大的電擊。皮卡丘儲存大量的電力在它的臉頰上，當遇到危險時，會釋放電擊來保護自己。',
    stats: [
      { name: 'HP', value: 35, maxValue: 100 },
      { name: '攻擊', value: 55, maxValue: 100 },
      { name: '防禦', value: 40, maxValue: 100 },
      { name: '特攻', value: 50, maxValue: 100 },
      { name: '特防', value: 50, maxValue: 100 },
      { name: '速度', value: 90, maxValue: 100 },
    ],
    attributes: {
      '身高': '0.4 m',
      '體重': '6.0 kg',
      '分類': '鼠寶可夢',
      '特性': '靜電',
      '世代': '第一世代',
    },
  },
};

// 多種類型標籤
export const MultipleTypes: Story = {
  args: {
    name: '伊布',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
    types: ['normal'],
    description: '伊布擁有不穩定的基因，可以根據環境進化成不同的形態。',
    stats: [
      { name: 'HP', value: 55, maxValue: 100 },
      { name: '攻擊', value: 55, maxValue: 100 },
      { name: '防禦', value: 50, maxValue: 100 },
      { name: '特攻', value: 45, maxValue: 100 },
      { name: '特防', value: 65, maxValue: 100 },
      { name: '速度', value: 55, maxValue: 100 },
    ],
  },
};

// 數碼寶貝示例
export const DigimonExample: Story = {
  args: {
    name: '亞古獸',
    image: 'https://digimon.shadowsmith.com/img/agumon.jpg',
    types: ['vaccine', 'reptile'],
    description: '亞古獸是一種恐龍型數碼寶貝，擁有強大的火焰攻擊能力，可以進化成多種強大的形態。',
    attributes: {
      '等級': '新手級',
      '屬性': '疫苗屬性',
      '種族': '恐龍型',
      '必殺技': '小型火焰',
    },
    stats: [
      { name: '攻擊力', value: 60, maxValue: 100 },
      { name: '防禦力', value: 40, maxValue: 100 },
      { name: '速度', value: 50, maxValue: 100 },
      { name: '持久力', value: 65, maxValue: 100 },
    ],
  },
}; 