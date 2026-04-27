import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const { productId, rating, comment } = await req.json();

  const existing = await prisma.review.findFirst({
    where: { userId: session.user.id, productId },
  });

  if (existing) {
    return NextResponse.json({ error: "Already reviewed" }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      userId: session.user.id,
      productId,
      rating,
      comment,
    },
    include: { user: true },
  });

  return NextResponse.json(review);
}
