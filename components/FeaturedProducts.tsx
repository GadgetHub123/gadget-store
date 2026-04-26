import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FeaturedClient from "./FeaturedClient";

export default async function FeaturedProducts() {
  const featured = await prisma.product.findMany({
    where: {
      name: {
        in: ["UltraPhone 14", "SmartWatch S2", "StudioCans HD", "TabPad Ultra"],
      },
    },
  });

  const getProduct = (name: string) => featured.find((p) => p.name === name);

  const phone = getProduct("UltraPhone 14");
  const watch = getProduct("SmartWatch S2");
  const headphones = getProduct("StudioCans HD");
  const tablet = getProduct("TabPad Ultra");

  return (
    <FeaturedClient
      phone={phone}
      watch={watch}
      headphones={headphones}
      tablet={tablet}
    />
  );
}
