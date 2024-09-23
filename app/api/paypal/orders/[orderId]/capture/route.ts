import { captureOrder } from "@/lib/paypal";

export const POST = async (req, { params }) => {
  console.log("Capture");
  console.log("Request = ", await req);
  console.log("Params = ", await params);

  try {
    const orderID = await params.orderId;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
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