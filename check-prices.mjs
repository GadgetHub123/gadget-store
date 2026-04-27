import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const products = await prisma.product.findMany();
  products.forEach(p => console.log(p.name + ': ' + p.price));
  process.exit(0);
}
main();
