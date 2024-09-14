import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const existingCompany = await db.company.findFirst({
    where: {
      OR: [
        { companyName: body.companyPersonName },
        { contactEmail: body.contactPersonEmail },
      ],
    },
  });

  if (existingCompany) {
    return NextResponse.json(
      { message: "Company is already registered or pending verification" },
      { status: 400 }
    );
  }

  await db.company.create({
    data: {
      companyName: body.companyName,
      companyAddress: body.companyAddress,
      contactPerson: body.contactPersonName,
      contactEmail: body.contactPersonEmail,
    },
  });

  return NextResponse.json(
    { message: "Registration successful" },
    { status: 200 }
  );
}
