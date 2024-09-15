"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { ConfirmModal } from "./modal/confirm-modal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

interface ActionsProps {
  // userId: string;
  // role: string
};

export const Actions = ({
  // userId,
  // role
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {orgRole} = useAuth()
  
  const clickHandler = () => {
    // try {
    //   setIsLoading(true);

    //   await axios.delete(`/api/users/${userId}`);

    //   toast.success("User deleted successfully");
    //   router.push(`/dashboard/admin/roles`);

    //   router.refresh();
    // } catch (error) {
    //   toast.error("Something went wrong");
    // } finally {
    //   setIsLoading(false);
    // }
  }

  return (
      <ConfirmModal onConfirm={clickHandler}>
        <Button variant="success" border="rounded" size="lg">Donate now</Button>
      </ConfirmModal>
  )
}