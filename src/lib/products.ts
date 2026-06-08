import bloueImg from "@/assets/p-blouse.jpg";
import blazerImg from "@/assets/p-blazer.jpg";
import trousersImg from "@/assets/p-trousers.jpg";
import hoopsImg from "@/assets/p-hoops.jpg";
import sweaterImg from "@/assets/p-sweater.jpg";
import coatImg from "@/assets/p-coat.jpg";
import toteImg from "@/assets/p-tote.jpg";
import shoesImg from "@/assets/p-shoes.jpg";
import shirtImg from "@/assets/p-shirt.jpg";

export type Category = "women" | "men" | "accessories" | "footwear";

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  collection: "new" | "best-seller" | "sale" | "classic";
  colorName: string;
  colorHex: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  image: string;
  hoverImage?: string;
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
  details: string[];
  material: string;
  badge?: "New" | "Best Seller" | "Sale";
};

const SIZES_APPAREL = ["XS", "S", "M", "L", "XL"];
const SIZES_TROUSER = ["24", "26", "28", "30", "32"];
const SIZES_SHOE = ["36", "37", "38", "39", "40", "41"];
const SIZES_OS = ["One Size"];

export const products: Product[] = [
  {
    slug: "satin-drape-blouse",
    name: "Satin Drape Blouse",
    price: 185,
    category: "women",
    collection: "best-seller",
    colorName: "Champagne",
    colorHex: "#E7D7B7",
    colors: [
      { name: "Champagne", hex: "#E7D7B7" },
      { name: "Ink", hex: "#1a1a1a" },
    ],
    sizes: SIZES_APPAREL,
    image: bloueImg,
    hoverImage: sweaterImg,
    rating: 4.8,
    reviewCount: 142,
    stock: 24,
    description:
      "A fluid satin blouse with a sculpted drape neckline. Cut from heavyweight Italian silk for a soft hand and a quiet, expensive sheen.",
    details: ["100% Italian silk satin", "Dry clean only", "Made in Portugal"],
    material: "Italian Silk Satin",
    badge: "Best Seller",
  },
  {
    slug: "architect-blazer",
    name: "The Architect Blazer",
    price: 420,
    category: "women",
    collection: "new",
    colorName: "Charcoal",
    colorHex: "#2c2c2c",
    colors: [
      { name: "Charcoal", hex: "#2c2c2c" },
      { name: "Camel", hex: "#b08a5a" },
    ],
    sizes: SIZES_APPAREL,
    image: blazerImg,
    hoverImage: coatImg,
    rating: 4.9,
    reviewCount: 87,
    stock: 12,
    description:
      "Single-breasted blazer in a structured Italian wool — sharp at the shoulder, narrow at the waist, with our signature long lapel.",
    details: ["98% Wool, 2% Elastane", "Fully lined in cupro", "Hand-finished buttonholes"],
    material: "Italian Wool",
    badge: "New",
  },
  {
    slug: "linen-palazzo-trouser",
    name: "Linen Palazzo Trouser",
    price: 240,
    compareAtPrice: 320,
    category: "women",
    collection: "sale",
    colorName: "Ivory",
    colorHex: "#efe9dc",
    colors: [
      { name: "Ivory", hex: "#efe9dc" },
      { name: "Stone", hex: "#b4a78c" },
    ],
    sizes: SIZES_TROUSER,
    image: trousersImg,
    rating: 4.6,
    reviewCount: 64,
    stock: 18,
    description:
      "Wide-leg palazzo trouser in heavyweight Belgian linen with a single sharp pleat and a hidden side closure.",
    details: ["100% Belgian linen", "Cool wash", "Made in Italy"],
    material: "Belgian Linen",
    badge: "Sale",
  },
  {
    slug: "orbital-hoops",
    name: "Orbital Hoops",
    price: 110,
    category: "accessories",
    collection: "best-seller",
    colorName: "18k Gold Plate",
    colorHex: "#c9a96b",
    colors: [{ name: "18k Gold Plate", hex: "#c9a96b" }],
    sizes: SIZES_OS,
    image: hoopsImg,
    rating: 4.7,
    reviewCount: 211,
    stock: 50,
    description:
      "Hand-formed brass hoops finished in 18k gold plate. Light to wear, sculpted to last.",
    details: ["Brass with 18k gold plating", "Hypoallergenic posts"],
    material: "Plated brass",
  },
  {
    slug: "boiled-cashmere-sweater",
    name: "Boiled Cashmere Sweater",
    price: 380,
    category: "women",
    collection: "classic",
    colorName: "Oat",
    colorHex: "#d8c7a8",
    colors: [
      { name: "Oat", hex: "#d8c7a8" },
      { name: "Stone", hex: "#b0a48a" },
    ],
    sizes: SIZES_APPAREL,
    image: sweaterImg,
    rating: 4.9,
    reviewCount: 156,
    stock: 9,
    description:
      "An oversized, ribbed crewneck in boiled Mongolian cashmere. Dense, weighty and built to soften over time.",
    details: ["100% Mongolian cashmere", "Cool hand wash", "Made in Italy"],
    material: "Mongolian Cashmere",
  },
  {
    slug: "heirloom-overcoat",
    name: "The Heirloom Overcoat",
    price: 980,
    category: "women",
    collection: "new",
    colorName: "Camel",
    colorHex: "#b08a5a",
    colors: [
      { name: "Camel", hex: "#b08a5a" },
      { name: "Ink", hex: "#1a1a1a" },
    ],
    sizes: SIZES_APPAREL,
    image: coatImg,
    hoverImage: blazerImg,
    rating: 5.0,
    reviewCount: 38,
    stock: 6,
    description:
      "A long, double-breasted coat in pure virgin wool, cut for movement and weighted to fall cleanly.",
    details: ["100% Virgin wool", "Cupro lined", "Made in Italy"],
    material: "Virgin Wool",
    badge: "New",
  },
  {
    slug: "studio-tote",
    name: "Studio Tote — Cognac",
    price: 650,
    category: "accessories",
    collection: "best-seller",
    colorName: "Cognac",
    colorHex: "#8a4d2b",
    colors: [
      { name: "Cognac", hex: "#8a4d2b" },
      { name: "Ink", hex: "#1a1a1a" },
    ],
    sizes: SIZES_OS,
    image: toteImg,
    rating: 4.8,
    reviewCount: 92,
    stock: 14,
    description:
      "A structured everyday tote in full-grain vegetable-tanned leather, hand-burnished at the edges.",
    details: ["Italian full-grain leather", "Suede-lined interior", "Removable shoulder strap"],
    material: "Full-grain leather",
    badge: "Best Seller",
  },
  {
    slug: "atelier-derby",
    name: "Atelier Derby",
    price: 460,
    category: "footwear",
    collection: "classic",
    colorName: "Ink",
    colorHex: "#1a1a1a",
    colors: [
      { name: "Ink", hex: "#1a1a1a" },
      { name: "Cognac", hex: "#8a4d2b" },
    ],
    sizes: SIZES_SHOE,
    image: shoesImg,
    rating: 4.7,
    reviewCount: 73,
    stock: 20,
    description:
      "A classic four-eyelet derby with a slim almond toe, Blake-stitched on a leather sole.",
    details: ["Box calf leather", "Leather sole", "Blake construction"],
    material: "Box calf leather",
  },
  {
    slug: "structured-poplin-shirt",
    name: "Structured Poplin Shirt",
    price: 165,
    category: "men",
    collection: "best-seller",
    colorName: "Off White",
    colorHex: "#f1eee6",
    colors: [
      { name: "Off White", hex: "#f1eee6" },
      { name: "Sky", hex: "#bcd0d8" },
    ],
    sizes: SIZES_APPAREL,
    image: shirtImg,
    rating: 4.6,
    reviewCount: 118,
    stock: 30,
    description:
      "A relaxed-fit poplin shirt with a soft button-down collar and mother-of-pearl buttons.",
    details: ["100% organic cotton poplin", "Mother-of-pearl buttons", "Machine wash cold"],
    material: "Organic Cotton Poplin",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelated(slug: string, n = 4): Product[] {
  const target = getProduct(slug);
  if (!target) return [];
  return products
    .filter((p) => p.slug !== slug && p.category === target.category)
    .slice(0, n);
}

export const CATEGORIES: { slug: string; label: string }[] = [
  { slug: "new", label: "New Arrivals" },
  { slug: "women", label: "Women" },
  { slug: "men", label: "Men" },
  { slug: "accessories", label: "Accessories" },
  { slug: "footwear", label: "Footwear" },
  { slug: "sale", label: "Sale" },
];