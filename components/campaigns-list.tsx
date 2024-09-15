import { Campaign, Category } from "@prisma/client";

import { CampaignCard } from "@/components/campaign-card";

type CampaignWithProgressWithCategory = Campaign & {
  category: Category | null;
  campaigns: { id: string }[];
  progress: number | null;
};

interface CampaignsListProps {
  items: CampaignWithProgressWithCategory[];
}

export const CampaignsList = ({
  items
}: CampaignsListProps) => {

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id}>
            <CampaignCard
              key={item.id}
              id={item.id}
              title={item.title}
              // imageUrl={item.imageUrl!}
              fund={item.fund!}
              progress={item.progress}
              category={item?.category?.name!}
            />
          </div>
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  )
}