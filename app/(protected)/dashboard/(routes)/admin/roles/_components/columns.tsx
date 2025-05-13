"use client"

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { OrganizationCustomRoleKey } from '@clerk/types'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import SelectRole from "./select-role";
import { Actions } from "./[roleId]/_components/actions";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.original.publicUserData?.imageUrl} sizes="sm"/>
            <AvatarFallback>{row.original.publicUserData?.identifier}</AvatarFallback>
          </Avatar>
          <span>{row.original.publicUserData?.firstName + " " + row.original.publicUserData?.lastName}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row }) => {
      return row.original.publicUserData?.identifier
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joined
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row }) => {
      return row.original.createdAt.toLocaleDateString()
    }
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (     
        <>
          <SelectRole
            defaultRole={row.original.role}
            onChange={async (e) => {
              await row.original.update({
                role: e.target.value as OrganizationCustomRoleKey,
              })
              await row.original.revalidate()
            }}
          />
        </>
      )
    }
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return (
      
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Actions
                userId={row.original.publicUserData?.userId}
                role={row.original.role}
              />
            </span>
          </DropdownMenuTrigger>
        </DropdownMenu>
      )
    }
  }
]
