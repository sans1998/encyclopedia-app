import React from 'react';
import Card, { CardContent } from '@/components/common/Card';
import Link from 'next/link';
import { formatId } from '@/utils/formatters';
import { CreatureCardProps } from '@/types';

const CreatureCard: React.FC<CreatureCardProps> = ({
  name,
  image,
  tags,
  backgroundGradient,
  href,
  id
}) => {
  return (
    <Link href={href} className="block transition-transform hover:scale-105">
      <Card 
        hoverable 
        variant="elevated"
        className={`bg-gradient-to-br ${backgroundGradient}`}
      >
        <CardContent className="text-center">
          {image && <img src={image} alt={name} className="mx-auto w-24 h-24" />}
          <p className="font-semibold line-clamp-1 py-2 h-8">{name}</p>
          <p className="text-sm text-gray-500">{formatId(id)}</p>
          
          <div className="flex flex-wrap items-center justify-center gap-1 mt-1 grow line-clamp-2">
            {tags}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CreatureCard; 