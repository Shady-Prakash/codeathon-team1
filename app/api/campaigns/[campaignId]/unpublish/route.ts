import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params } : { params: { campaignId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const campaign = await db.campaign.findUnique({
      where: {
        id: params.campaignId,
        userId,
      },
    });

    if(!campaign) {
      return new NextResponse("Not found", { status: 404 });
    }

    const unpublishedCampaign = await db.campaign.update({
      where: {
        id: params.campaignId,
        userId,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unpublishedCampaign);
  } catch (error) {
    console.log("[CAMPAIGN_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}