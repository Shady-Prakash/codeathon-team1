import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/campaign-progress";

interface CampaignCardProps {
  id: string;
  title: string;
  imageUrl: string;
  fund: number;
  progress: number | null;
  category: string;
};

export const CampaignCard = ({
  id,
  title,
  imageUrl,
  fund,
  progress,
  category,
}: CampaignCardProps) => {
  return (
    <Link href={`/dashboard/admin/campaigns/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition linw-clamp-2">
            {title}
          </div>
          <p className="text-sm text-muted-foreground">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
            </div>
          </div>
          
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(fund)}
            </p>
          
        </div>
      </div>
    </Link>
  )
}