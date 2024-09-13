"use client"

import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";

import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Actions } from "./actions";
import { ConfirmModal } from "@/components/modals/confirm-modal";
// import { Actions } from "./[roleId]/_components/actions";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "emailAddress",
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
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invited
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
    cell: ({row }) => {
      return row.original.role === "org:admin" ? "Admin" : row.original.role === "org:member" ? "Member" : "Super admin"
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
                organizationId={row.original.organizationId}
                invitationId={row.original.id}
                role={row.original.role}
              />
            </span>
          </DropdownMenuTrigger>
        </DropdownMenu>
      )
    }
  }
]
