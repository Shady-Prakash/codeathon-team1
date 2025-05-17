"use client"

import { Campaign } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { SortableHeader } from "./sortable-header";

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableHeader column={column} title="Campaign Name" />
    ),
  },
  {
    accessorKey: "fund",
    header: ({ column }) => (
      <SortableHeader column={column} title="fund" />

    ),
    cell: ({ row }) => {
      const fund = parseFloat(row.getValue("fund") || "0");

      return <div>{formatPrice(fund)}</div>
    }
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => (
      <SortableHeader column={column} title="isPublished" />
    ),
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;
      return (
        <Badge className={cn(
          "bg-slate-500",
          isPublished && "bg-sky-700"
        )}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (

      < SortableHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      return row.original.updatedAt.toLocaleDateString()
    }
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/admin/campaigns/${id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
