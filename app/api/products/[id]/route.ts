import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: "Product deleted" });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = await req.json();
  const product = await prisma.product.update({ where: { id }, data });
  return NextResponse.json(product);
}
