import type { Meta, StoryObj } from '@storybook/react';
import CreatureCard from '../components/CreatureCard';
import { Pokemon, Digimon } from '../types';

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
    type: 'pokemon',
    data: {
      id: 25,
      name: 'pikachu',
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        other: {
          'official-artwork': {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
          }
        }
      },
      types: [
        { type: { name: 'electric' } }
      ],
      height: 4,
      weight: 60,
      abilities: [{ ability: { name: 'static' } }],
      stats: [{ base_stat: 55, stat: { name: 'speed' } }]
    } as Pokemon
  },
};

export const DigimonCard: Story = {
  args: {
    type: 'digimon',
    data: {
      id: 1,
      name: 'Agumon',
      images: [
        { href: 'https://digimon.shadowsmith.com/img/agumon.jpg' }
      ],
      types: [
        { id: 1, type: 'vaccine' }
      ],
      levels: [{ id: 1, level: 'rookie' }],
      attributes: [{ id: 1, attribute: 'vaccine' }],
      fields: [{ id: 1, field: 'nature spirits', image: '' }],
      descriptions: [{ language: 'en', description: 'A reptile Digimon with tough skin' }]
    } as Digimon
  },
};

export const NoImageCard: Story = {
  args: {
    type: 'pokemon',
    data: {
      id: 999,
      name: '未知精靈',
      sprites: {
        front_default: ''
      },
      types: [],
      height: 0,
      weight: 0,
      abilities: [],
      stats: []
    } as Pokemon
  },
}; 