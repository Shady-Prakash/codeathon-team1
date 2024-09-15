import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const companyId = parseInt(params.id, 10);

  if (isNaN(companyId)) {
    return NextResponse.json({ error: "Invalid company ID" }, { status: 400 });
  }

  try {
    await db.company.update({
      where: { id: companyId },
      data: { status: "verified" },
    });

    return NextResponse.json(
      { message: "Company verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to verify company:", error);
    return NextResponse.json(
      { error: "Failed to verify company" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "GET method is not supported for this endpoint" },
    { status: 405 }
  );
}
