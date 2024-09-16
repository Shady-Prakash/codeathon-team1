import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const campaign = await db.campaign.create({
      data: {
        userId,
        title
      }
    })

    return NextResponse.json(campaign);
  } catch (error) {
    console.log("[CAMPAIGNS]", error);
    return new NextResponse("Internal Error", { status:500 });
  }
}

export async function GET(
  req: Request,
) {
  try {

    const campaigns = await db.campaign.findMany({
      where: {
        isPublished: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      }
    })

    return NextResponse.json(campaigns);
  } catch (error) {
    console.log("[CAMPAIGNS]", error);
    return new NextResponse("Internal Error", { status:500 });
  }
}

