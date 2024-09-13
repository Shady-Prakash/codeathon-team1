import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }:{ params: { organizationId: string } }
) {
  try{
    const {userId} = auth();
    const{organizationId} = params;
    const values = await req.json();

    if(!userId) {
      return new NextResponse("unauthorized", {status: 401});
    }

    const organization = await db.organization.update({
      where: {
        id: organizationId,
        userId
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(organization);

  } catch(error) {
    console.log("[ORGANIZATION_ID", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}