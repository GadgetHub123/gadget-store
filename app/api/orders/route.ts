import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sendOrderConfirmationEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "You must be logged in" },
      { status: 401 },
    );
  }

  const { items, address, payment } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const total = items.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0,
  );

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      total,
      address,
      status: "pending",
      items: {
        create: items.map(
          (item: { id: string; price: number; quantity: number }) => ({
            productId: item.id,
            quantity: item.quantity,
            priceAtPurchase: item.price,
          }),
        ),
      },
    },
  });

  // Send confirmation email
  try {
    await sendOrderConfirmationEmail({
      to: session.user.email!,
      customerName: session.user.name!,
      orderId: order.id,
      items: items.map(
        (item: { name: string; quantity: number; price: number }) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }),
      ),
      total,
      address,
      payment: payment || "cod",
    });
  } catch (err) {
    console.error("Email failed:", err);
  }

  return NextResponse.json({ message: "Order placed!", orderId: order.id });
}
