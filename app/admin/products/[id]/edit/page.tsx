import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "@/components/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return notFound();

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-8">Edit product</h1>
      <EditProductForm product={product} />
    </div>
  );
}
