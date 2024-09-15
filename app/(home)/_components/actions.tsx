"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { ConfirmModal } from "./modal/confirm-modal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export const Actions = () => {
  return (
    <Link href="/dashboard">
      <Button variant="success" border="rounded" size="lg">
        Dashboard
      </Button>
    </Link>
  );
};
