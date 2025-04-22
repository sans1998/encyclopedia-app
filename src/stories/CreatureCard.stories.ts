import type { Meta, StoryObj } from '@storybook/react';
import CreatureCard from '../components/CreatureCard';

const meta = {
  title: 'App/CreatureCard',
  component: CreatureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CreatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PokemonCard: Story = {
  args: {
    name: 'Pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['electric'],
    id: 25,
    category: '寶可夢',
  },
};

export const DigimonCard: Story = {
  args: {
    name: 'Agumon',
    image: 'https://digimon.shadowsmith.com/img/agumon.jpg',
    types: ['vaccine', 'reptile'],
    id: 1,
    category: '數碼寶貝',
  },
};

export const MultipleTypes: Story = {
  args: {
    name: 'Charizard',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    types: ['fire', 'flying'],
    id: 6,
    category: '寶可夢',
  },
};

export const LongName: Story = {
  args: {
    name: 'Corphish with a very long name that should wrap',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/341.png',
    types: ['water'],
    id: 341,
    category: '寶可夢',
  },
};

export const NoImage: Story = {
  args: {
    name: '未知精靈',
    image: '',
    types: ['unknown'],
    id: 999,
    category: '未分類',
  },
}; 