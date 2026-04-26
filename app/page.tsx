import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import HomePromo from "@/components/HomePromo";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProducts />
      <HomePromo />
    </div>
  );
}
