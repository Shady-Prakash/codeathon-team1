"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";

interface CampaignActionsProps {
  disabled: boolean;
  campaignId: string;
  isPublished: boolean;
};

export const CampaignActions = ({
  disabled,
  campaignId,
  isPublished
}: CampaignActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const onClickHanlder = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/campaigns/${campaignId}/unpublish`);
        toast.success("Campaign unpublished");
      } else {
        await axios.patch(`/api/campaigns/${campaignId}/publish`);
        toast.success("Campaign published");
      }

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  }
  
  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/campaigns/${campaignId}`);

      toast.success("Campaign deleted");
      router.push(`/dashboard/admin/campaigns`);

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClickHanlder}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}