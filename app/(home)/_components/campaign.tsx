'use client';
import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogTrigger } from '../../../components/ui/dialog';
import { DialogContent } from '../../../components/ui/dialog';
import { DialogHeader } from '../../../components/ui/dialog';
import { DialogTitle } from '../../../components/ui/dialog';
import { DialogFooter } from '../../../components/ui/dialog';
import Link from 'next/link';
import { campaigns } from '../../data/campaigns';

type CampaignProps = {
  title: string;
  body: string;
  link: string;
  imageSrc: string;
};

const CampaignCard: React.FC<CampaignProps> = ({
  title,
  body,
  link,
  imageSrc,
}) => {
  return (
    <div className='border-2 border-gray-300 rounded-lg p-4 w-full flex flex-col justify-between'>
      <img
        src={imageSrc}
        alt={title}
        className='w-full h-[60vh] object-cover rounded-md mb-4' // 60vh is approximately 50% larger than the previous h-40
      />

      <div>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='text-gray-600 mt-2'>{body}</p>
      </div>
      <div className='mt-4'>
        <Link href={link} className='text-green-600 hover:underline'>
          Donate now
        </Link>
      </div>
    </div>
  );
};

const Campaigns: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div>
      <div className='bg-[#059669] text-white text-center py-8'>
        <h1 className='text-3xl font-bold'>Donate to The Big Alliance</h1>
        <p className='text-lg mt-2'>
          People in crisis need your help. Your donation will change lives.
        </p>
      </div>

      <div className='p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Campaigns</h2>
          <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogTrigger asChild>
              <Button variant='outline'>Filter</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Campaigns</DialogTitle>
              </DialogHeader>
              <div>
                <p>Filter options</p>
              </div>
              <DialogFooter>
                <Button onClick={() => setFilterOpen(false)}>Apply</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6'>
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              title={campaign.name}
              body={campaign.description}
              link='#'
              imageSrc={campaign.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
