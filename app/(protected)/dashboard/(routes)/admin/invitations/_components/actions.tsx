"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

interface ActionsProps {
  organizationId: string;
  invitationId: string;
  role: string;
};

export const Actions = ({
  organizationId,
  invitationId,
  role
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { orgRole } = useAuth()
  
  const onRevoke = async () => {
    try {
      setIsLoading(true);

      await axios.post(`/api/organizations/${organizationId}/invitations/${invitationId}/revoke`);

      toast.success("Invitation revoked successfully");
      router.refresh();

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ConfirmModal onConfirm={onRevoke}>
        <Button size="sm" disabled={orgRole === "org:admin" && role === "org:super_admin" || orgRole ==="org:member" || isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </>
  )
}