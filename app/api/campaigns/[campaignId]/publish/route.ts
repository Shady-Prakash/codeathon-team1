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

    if (!campaign.title || !campaign.description || !campaign.fund) {
      return new NextResponse("Missing required fields", { status:401 });
    }

    const publishedCampaign = await db.campaign.update({
      where: {
        id: params.campaignId,
        userId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedCampaign);
  } catch (error) {
    console.log("[CAMPAIN_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}