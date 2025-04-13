import { captureOrder } from "@/lib/paypal";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export const POST = async (req, { params }) => {
  console.log("Capture");
  console.log("Request = ", await req);
  console.log("Params = ", await params);

  try {
    const { userId } = auth();

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orderID = await params.orderId;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    console.log("orderID", orderID)
    await db.transaction.update({
      where: {
        orderId: orderID,
      },
      data: {
        payerName: `${jsonResponse.payer.name.given_name} ${jsonResponse.payer.name.surname}`,
        payerEmail: jsonResponse.payer.email_address,
        transactionId: jsonResponse.id,
        status: jsonResponse.status,
      },
    })
    
    return new Response(JSON.stringify(jsonResponse), {
      status: httpStatusCode,
    });
  } catch (error) {
    console.error("Failed to create order:", error);
    return new Response(JSON.stringify({ error: "Failed to create order." }), {
      status: 500,
    });
  }
};