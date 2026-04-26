import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      // ── Audio ──
      {
        name: "ProBuds X5",
        description:
          "Premium noise-cancelling wireless earbuds with 30hr battery life, spatial audio, and adaptive EQ.",
        price: 129,
        stock: 50,
        category: "Audio",
        imageUrl:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
      },
      {
        name: "NeckBand Pro",
        description:
          "Wireless neckband headphones with deep bass, 20hr battery, and magnetic earbuds.",
        price: 59,
        stock: 100,
        category: "Audio",
        imageUrl:
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      },
      {
        name: "StudioCans HD",
        description:
          "Over-ear studio headphones with 40mm drivers, foldable design, and hi-res audio.",
        price: 199,
        stock: 25,
        category: "Audio",
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      },
      {
        name: "BassBar Speaker",
        description:
          "Portable Bluetooth speaker with 360-degree sound, 24hr battery, and IPX7 waterproof.",
        price: 89,
        stock: 60,
        category: "Audio",
        imageUrl:
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
      },
      {
        name: "SoundDock Mini",
        description:
          "Compact desktop speaker dock with rich stereo sound and USB-C charging.",
        price: 149,
        stock: 35,
        category: "Audio",
        imageUrl:
          "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=600&fit=crop",
      },
      {
        name: "AirSound Pro",
        description:
          "True wireless earbuds with active noise cancellation and 36hr total battery.",
        price: 159,
        stock: 40,
        category: "Audio",
        imageUrl:
          "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&h=600&fit=crop",
      },
      {
        name: "SubWoofer X3",
        description:
          "Portable subwoofer with deep bass, 360 surround sound and waterproof body.",
        price: 199,
        stock: 20,
        category: "Audio",
        imageUrl:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      },
      {
        name: "RetroBeats",
        description:
          "Vintage-style over-ear headphones with modern Bluetooth 5.3 and 50hr battery.",
        price: 119,
        stock: 30,
        category: "Audio",
        imageUrl:
          "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop",
      },
      {
        name: "SleepBuds Z",
        description:
          "Ultra-small sleep earbuds with masking sounds and 10hr battery.",
        price: 79,
        stock: 55,
        category: "Audio",
        imageUrl:
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop",
      },
      {
        name: "StageMonitor S1",
        description:
          "Professional in-ear monitor with balanced armature drivers for musicians.",
        price: 299,
        stock: 15,
        category: "Audio",
        imageUrl:
          "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=600&fit=crop",
      },

      // ── Wearables ──
      {
        name: "SmartWatch S2",
        description:
          "Health tracking smartwatch with AMOLED display, GPS, blood oxygen monitoring.",
        price: 249,
        stock: 30,
        category: "Wearables",
        imageUrl:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      },
      {
        name: "FitBand Ultra",
        description:
          "Slim fitness tracker with heart rate monitoring, sleep tracking, and 14-day battery.",
        price: 89,
        stock: 60,
        category: "Wearables",
        imageUrl:
          "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop",
      },
      {
        name: "RunWatch Pro",
        description:
          "GPS running watch with advanced metrics, VO2 max estimation, and 14-day battery.",
        price: 329,
        stock: 20,
        category: "Wearables",
        imageUrl:
          "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop",
      },
      {
        name: "SmartRing X1",
        description:
          "Sleek health tracking ring with heart rate, SpO2, sleep tracking in titanium body.",
        price: 199,
        stock: 40,
        category: "Wearables",
        imageUrl:
          "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
      },
      {
        name: "KidsWatch Safe",
        description:
          "GPS smartwatch for kids with SOS button, geo-fencing, and calling features.",
        price: 99,
        stock: 45,
        category: "Wearables",
        imageUrl:
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
      },
      {
        name: "EliteWatch X",
        description:
          "Premium titanium smartwatch with sapphire glass, ECG monitor, and LTE connectivity.",
        price: 599,
        stock: 10,
        category: "Wearables",
        imageUrl:
          "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop",
      },
      {
        name: "SportBand V2",
        description:
          "Lightweight sport band with 20-day battery, swim-proof design and 24/7 health tracking.",
        price: 69,
        stock: 80,
        category: "Wearables",
        imageUrl:
          "https://images.unsplash.com/photo-1631193816258-28b44b21e78b?w=600&h=600&fit=crop",
      },

      // ── Phones ──
      {
        name: "UltraPhone 14",
        description:
          "Flagship smartphone with 200MP camera, 5000mAh battery, and 120Hz AMOLED display.",
        price: 699,
        stock: 20,
        category: "Phones",
        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      },
      {
        name: "MiniPhone Lite",
        description:
          "Compact 5G smartphone with 6.1-inch display, 64MP camera, and all-day battery.",
        price: 399,
        stock: 35,
        category: "Phones",
        imageUrl:
          "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=600&fit=crop",
      },
      {
        name: "FoldPhone Z3",
        description:
          "Next-gen foldable smartphone with 7.6-inch inner display and dual cameras.",
        price: 999,
        stock: 10,
        category: "Phones",
        imageUrl:
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
      },
      {
        name: "BudgetPhone X",
        description:
          "Affordable 5G phone with 6.5-inch display, 50MP camera, and 5000mAh battery.",
        price: 249,
        stock: 80,
        category: "Phones",
        imageUrl:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop",
      },
      {
        name: "GamingPhone R1",
        description:
          "Gaming smartphone with 165Hz display, 6000mAh battery, and shoulder triggers.",
        price: 799,
        stock: 15,
        category: "Phones",
        imageUrl:
          "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop",
      },
      {
        name: "CameraPhone P5",
        description:
          "Photography-focused phone with Leica optics, 1-inch sensor, and 10x optical zoom.",
        price: 899,
        stock: 12,
        category: "Phones",
        imageUrl:
          "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop",
      },
      {
        name: "SlimPhone S1",
        description:
          "Ultra-thin 5.8mm smartphone with 6.7-inch display and 45W fast charging.",
        price: 549,
        stock: 25,
        category: "Phones",
        imageUrl:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop",
      },

      // ── Tablets ──
      {
        name: "TabPad Ultra",
        description:
          "10.9-inch tablet with stylus support, 2K display, and 12hr battery for creators.",
        price: 449,
        stock: 15,
        category: "Tablets",
        imageUrl:
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
      },
      {
        name: "DrawPad Pro",
        description:
          "12.9-inch creative tablet with 4K display and pressure-sensitive stylus.",
        price: 799,
        stock: 12,
        category: "Tablets",
        imageUrl:
          "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop",
      },
      {
        name: "KidsPad Safe",
        description:
          "Durable kids tablet with parental controls, 8-inch display, and shockproof case.",
        price: 149,
        stock: 45,
        category: "Tablets",
        imageUrl:
          "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=600&h=600&fit=crop",
      },
      {
        name: "BookTab E5",
        description:
          "E-ink tablet with stylus for note-taking, 13-inch display, and 4-week battery.",
        price: 349,
        stock: 20,
        category: "Tablets",
        imageUrl:
          "https://images.unsplash.com/photo-1553545204-4f7d339aa06a?w=600&h=600&fit=crop",
      },
      {
        name: "TabGo Mini",
        description:
          "Compact 8-inch Android tablet with LTE, lightweight body, and all-day battery.",
        price: 199,
        stock: 35,
        category: "Tablets",
        imageUrl:
          "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=600&h=600&fit=crop",
      },

      // ── Accessories ──
      {
        name: "StreamCam HD",
        description:
          "4K webcam with autofocus, built-in ring light, and plug-and-play USB-C.",
        price: 89,
        stock: 40,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=600&fit=crop",
      },
      {
        name: "MechKeys Pro",
        description:
          "Wireless mechanical keyboard with hot-swappable switches and RGB backlighting.",
        price: 159,
        stock: 45,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop",
      },
      {
        name: "UltraMouseX",
        description:
          "Ergonomic wireless mouse with 26000 DPI sensor and 70hr battery life.",
        price: 79,
        stock: 55,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
      },
      {
        name: "ChargePad Max",
        description:
          "15W wireless charging pad with multi-device support and ultra-slim design.",
        price: 39,
        stock: 90,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
      },
      {
        name: "LapStand Pro",
        description:
          "Adjustable aluminum laptop stand with 6 height levels and cable management.",
        price: 49,
        stock: 80,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop",
      },
      {
        name: "HubStation 7",
        description:
          "7-in-1 USB-C hub with 4K HDMI, 100W PD, SD card, and 3 USB-A ports.",
        price: 69,
        stock: 50,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&h=600&fit=crop",
      },
      {
        name: "DeskMat XL",
        description:
          "Extra-large desk mat with wireless charging zone and non-slip base.",
        price: 59,
        stock: 60,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=600&h=600&fit=crop",
      },
      {
        name: "CableKit Pro",
        description:
          "Premium braided cable set with USB-C, Lightning, and MagSafe connectors.",
        price: 29,
        stock: 120,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1601999009162-2459b0b32984?w=600&h=600&fit=crop",
      },
      {
        name: "PhoneGrip 360",
        description:
          "Magnetic phone grip with 360-degree rotation and MagSafe compatibility.",
        price: 19,
        stock: 150,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop",
      },
      {
        name: "ScreenGuard Pro",
        description:
          "Anti-glare tempered glass screen protector with edge-to-edge coverage.",
        price: 15,
        stock: 200,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=600&h=600&fit=crop",
      },
      {
        name: "PowerBank 30K",
        description:
          "30,000mAh power bank with 65W fast charging and dual USB-C output.",
        price: 89,
        stock: 45,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop",
      },
      {
        name: "CarMount Pro",
        description:
          "Magnetic car mount with wireless charging and 360-degree rotation.",
        price: 45,
        stock: 70,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=600&fit=crop",
      },
      {
        name: "SmartPlug X",
        description:
          "Wi-Fi smart plug with energy monitoring, scheduling, and voice control support.",
        price: 25,
        stock: 100,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&h=600&fit=crop",
      },
      {
        name: "LaptopBag Pro",
        description:
          "Water-resistant laptop bag with USB charging port and anti-theft zipper.",
        price: 79,
        stock: 40,
        category: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      },
    ],
  });

  console.log("✅ 50 products seeded!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
