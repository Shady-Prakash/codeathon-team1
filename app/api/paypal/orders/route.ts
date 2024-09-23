import { createOrder } from "@/lib/paypal";

export const POST = async (req) => {
  console.log("Request = ", await req);

  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const cart = await req.json();
    console.log("Cart = ", cart);

    const { jsonResponse, httpStatusCode } = await createOrder(cart);

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