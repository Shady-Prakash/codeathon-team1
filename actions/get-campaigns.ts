import { Category, Campaign } from "@prisma/client"
import { db } from "@/lib/db";
import { getProgress } from "./get-progress";
import { campaigns } from "@/app/data/campaigns";

// type CampaignWithProgressWithCategory = Campaign & {
//   category: Category | null;
//   camapigns: { id: string }[];
//   progress: number | null;
// }

type GetCampaigns = {
  title?: string;
  categoryId?: string;
}

export const getCampaigns = async ({
  title,
  categoryId
}: GetCampaigns) => {
  try {
    const campaigns = await db.campaign.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    return campaigns;
    // const campaignsWithProgress: CampaignWithProgressWithCategory[] = await Promise.all(
    //   campaigns.map(async campaign => {
    //     if (campaign.fund === 0) {
    //       return {
    //         ...campaign,
    //         // progress: null,
    //       }
    //     }

    //     // const progressPercentage = await getProgress(userId, course.id);

    //     return {
    //       ...campaign,
    //       // progress: progressPercentage,
    //     };

    //   })
    // );


    // return([campaigns]);
    // console.log(campaigns)
  } catch (error) {
    console.log("[GET_CAMPAIGNS]", error);
    return [];
  }
}