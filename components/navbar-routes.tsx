'use client';

import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { SearchInput } from './search-input';

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith('/dashboard/admin');
  const isCampaignPage = pathname?.includes('/dashboard/admin/campaigns');
  const isSearchPage = pathname === '/dashboard/search';

  return (
    <>
      {isSearchPage && (
        <div className='hidden md:block'>
          <SearchInput />
        </div>
      )}
      <div className='flex gap-x-2 ml-auto'>
        {isAdminPage || isCampaignPage ? (
          <Link href='/dashboard'>
            <Button
              size='sm'
              variant='ghost'
              style={{ color: 'rgb(3, 105, 161)' }}>
              <LogOut className='h-4 w-4 mr-2' />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href='/dashboard/admin/campaigns'>
            <Button
              size='sm'
              variant='ghost'
              style={{ color: 'rgb(3, 105, 161)' }}>
              Admin mode
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl='/' />
      </div>
    </>
  );
};
