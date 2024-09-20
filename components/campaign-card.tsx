import Image from 'next/image';
import Link from 'next/link';

import { formatPrice } from '@/lib/format';

interface CampaignCardProps {
  id: string;
  title: string;
  imageUrl: string;
  fund: number;
  progress: number | null;
  category: string;
}

export const CampaignCard = ({
  id,
  title,
  imageUrl,
  fund,
  progress,
  category,
}: CampaignCardProps) => {
  return (
    <Link href={`/dashboard/admin/campaigns/${id}`}>
      <div className='overflow-hidden border p-3 h-full'>
        {' '}
        {/* No hover or rounded classes */}
        <div className='relative w-full aspect-video overflow-hidden'>
          <Image fill className='object-cover' alt={title} src={imageUrl} />
        </div>
        <div className='flex flex-col pt-2'>
          <div className='text-lg md:text-base font-medium'>{title}</div>
          <p className='text-sm text-muted-foreground'>{category}</p>
          <div className='my-3 flex items-center gap-x-2 text-sm md:text-xs'>
            <div className='flex items-center gap-x-1 text-slate-500'>
              {/* Additional content can go here */}
            </div>
          </div>
          <p className='text-md md:text-sm font-medium text-slate-700'>
            {formatPrice(fund)}
          </p>
        </div>
      </div>
    </Link>
  );
};
