//this component at the momet is not integrated
import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
  });

  React.useEffect(() => {
    table.setPageIndex(pagination.pageIndex);
  }, [pagination.pageIndex, table]);

  return (
    <div>
      <div className='flex items-center justify-between py-4'>
        <Input
          placeholder='Filter campaign...'
          value={
            (table.getColumn('campaign')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('campaign')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <Link href='/dashboard/admin/campaigns/create'>
          <Button>
            <PlusCircle className='h-4 w-4 mr-2' />
            New campaign
          </Button>
        </Link>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='py-4'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  if (table.getCanPreviousPage()) {
                    table.previousPage();
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: table.getState().pagination.pageIndex,
                    }));
                  }
                }}
                className={
                  !table.getCanPreviousPage()
                    ? 'text-gray-400 cursor-not-allowed'
                    : ''
                }
              />
            </PaginationItem>
            {table.getPageCount() > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(0);
                      setPagination((prev) => ({
                        ...prev,
                        pageIndex: 0,
                      }));
                    }}>
                    1
                  </PaginationLink>
                </PaginationItem>
                {table.getPageCount() > 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(table.getPageCount() - 1);
                      setPagination((prev) => ({
                        ...prev,
                        pageIndex: table.getPageCount() - 1,
                      }));
                    }}>
                    {table.getPageCount()}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  if (table.getCanNextPage()) {
                    table.nextPage();
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: table.getState().pagination.pageIndex,
                    }));
                  }
                }}
                className={
                  !table.getCanNextPage()
                    ? 'text-gray-400 cursor-not-allowed'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
