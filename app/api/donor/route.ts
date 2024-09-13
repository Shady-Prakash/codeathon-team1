import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const { name, email, address } = await req.json();

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const donor = await db.donor.create({
      data: {
        name,
        email,
        address
      }
    })

    return NextResponse.json(donor);
  } catch (error) {
    console.log("[DONORS]", error);
    return new NextResponse("Internal Error", { status:500 });
  }
}