"use client";

import { campaignsStatusFilters } from '@/constants/constants';
import React, { useMemo, useState } from 'react'
import { DataTable } from '../data-table';
import { columns } from "../../_components/columns";
import usePageFilter from '@/hooks/use-debounce';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle, X } from 'lucide-react';

const DataTableWithTab = ({ data }: any) => {
  const [status, setStatus] = useState("all");
  const { searchTerm, debouncedSearchTerm, setSearchTerm } = usePageFilter(500)


  const campaign = useMemo(() => data, [data]);

  const handleClearSearchTerm = () => {
    setSearchTerm('')
  }

  const handleSetStatusFilter = (newStatusFilter: string) => {
    setStatus(newStatusFilter)
  }

  const filteredItems = useMemo(
    () =>
      campaign?.filter((item: any) => {
        const shouldFilterByName =
          item.title && item.title.toLowerCase().trim().includes(debouncedSearchTerm.toLowerCase())

        const matchesStatusFilter = ((item?.isPublished && status === "published") || (!item?.isPublished && status === "draft") || (status === "all"));
        console.log(item.title.toLowerCase().trim())
        return (
          shouldFilterByName && matchesStatusFilter
        )
      }),
    [debouncedSearchTerm, status]
  )

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter campaign..."
          className="max-w-xs"
          onClick={handleClearSearchTerm}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <X className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
        <Link href="/dashboard/admin/campaigns/create">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New campaign
          </Button>
        </Link>
      </div>
      <div className="tab">
        <div className="tab-header flex  py-2 rounded-sm">
          {campaignsStatusFilters.map((item, index) => {
            return (
              <button
                key={index}
                className={`${status === item.value ? "bg-sky-200/20 text-sky-700" : null} py-2 px-6 rounded-sm text-slate-500 hover:text-slate-600 text-sm font-medium`}
                onClick={() => handleSetStatusFilter(item.value)}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
      <DataTable columns={columns} data={filteredItems} />
    </>
  )
}

export default DataTableWithTab;