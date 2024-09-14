'use client';
import React from 'react';

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogTrigger } from '../../../components/ui/dialog';
import { DialogContent } from '../../../components/ui/dialog';
import { DialogHeader } from '../../../components/ui/dialog';
import { DialogTitle } from '../../../components/ui/dialog';
import { DialogFooter } from '../../../components/ui/dialog';
import Link from 'next/link';

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
        className='w-full h-40 object-cover rounded-md mb-4'
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

  const campaigns = [
    {
      title: 'Gaza Crisis Appeal',
      body: 'People urgently need clean water, food and medical care. Help us get this critical aid to those in desperate need.',
      link: '/donate-gaza',
      imageSrc: '/images/gaza-crisis.jpg',
    },
    {
      title: 'Support people in crisis',
      body: 'People need us right now, and we need you. With your support we can provide vital help when disaster strikes.',
      link: '/donate-crisis',
      imageSrc: '/images/crisis-support.jpg',
    },
    {
      title: 'Campaign 3',
      body: 'This is the body text for Campaign 3. Help us by donating today.',
      link: '/donate-campaign3',
      imageSrc: '/images/campaign3.jpg',
    },
    {
      title: 'Campaign 4',
      body: 'This is the body text for Campaign 4. Your donations make a difference.',
      link: '/donate-campaign4',
      imageSrc: '/images/campaign4.jpg',
    },
    {
      title: 'Campaign 5',
      body: 'Help Campaign 5 provide essential aid to those in need.',
      link: '/donate-campaign5',
      imageSrc: '/images/campaign5.jpg',
    },
    {
      title: 'Campaign 6',
      body: 'Support Campaign 6 to offer relief to affected communities.',
      link: '/donate-campaign6',
      imageSrc: '/images/campaign6.jpg',
    },
  ];

  return (
    <div>
      {/* Green Background Section */}
      {/* Option 1: Using Tailwind's custom color class */}
      <div className='bg-[#059669] text-white text-center py-8'>
        {/* Option 2: Using inline style */}
        {/* <div style={{ backgroundColor: '#059669' }} className="text-white text-center py-8"> */}
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
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              title={campaign.title}
              body={campaign.body}
              link={campaign.link}
              imageSrc={campaign.imageSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
