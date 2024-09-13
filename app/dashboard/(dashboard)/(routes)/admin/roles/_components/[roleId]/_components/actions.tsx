"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

interface ActionsProps {
  userId: string;
  role: string
};

export const Actions = ({
  userId,
  role
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {orgRole} = useAuth()
  
  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/users/${userId}`);

      toast.success("User deleted successfully");
      router.push(`/dashboard/admin/roles`);

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={orgRole === "org:admin" && role === "org:super_admin" || orgRole ==="org:member" || isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
  )
}