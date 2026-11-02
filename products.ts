export type Category = "perfume" | "shoes" | "bags";

export type Product = {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
};

export const products: Product[] = [
  { id: 1, name: "Noir Elegance", category: "perfume", price: 185000, image: "/products/perfume-1.jpg" },
  { id: 2, name: "Rose Whisper", category: "perfume", price: 165000, image: "/products/perfume-2.jpg" },
  { id: 3, name: "Ocean Breeze", category: "perfume", price: 145000, image: "/products/perfume-3.jpg" },
  { id: 4, name: "Golden Oud", category: "perfume", price: 245000, image: "/products/perfume-4.jpg" },

  { id: 5, name: "Premium Leather Shoe 1", category: "shoes", price: 280000, image: "/products/shoe-1.jpg" },
  { id: 6, name: "Premium Leather Shoe 2", category: "shoes", price: 295000, image: "/products/shoe-2.jpg" },
  { id: 7, name: "Premium Leather Shoe 3", category: "shoes", price: 310000, image: "/products/shoe-3.jpg" },
  { id: 8, name: "Premium Leather Shoe 4", category: "shoes", price: 275000, image: "/products/shoe-4.jpg" },

  { id: 9, name: "Classic Backpack", category: "bags", price: 185000, image: "/products/bag-1.jpg" },
  { id: 10, name: "Designer Backpack", category: "bags", price: 210000, image: "/products/bag-2.jpg" },
  { id: 11, name: "Urban Backpack", category: "bags", price: 195000, image: "/products/bag-3.jpg" },
  { id: 12, name: "Leather Style Bag", category: "bags", price: 225000, image: "/products/bag-4.jpg" },
  { id: 13, name: "Travel Backpack", category: "bags", price: 240000, image: "/products/bag-5.jpg" },
  { id: 14, name: "Casual Backpack", category: "bags", price: 175000, image: "/products/bag-6.jpg" },
  { id: 15, name: "Premium Backpack", category: "bags", price: 255000, image: "/products/bag-10.jpg" },
  { id: 16, name: "Stylish Backpack", category: "bags", price: 190000, image: "/products/bag-8.jpg" },
  { id: 17, name: "Modern Backpack", category: "bags", price: 205000, image: "/products/bag-11.jpg" },
  { id: 18, name: "Executive Bag", category: "bags", price: 265000, image: "/products/bag-7.jpg" },
  { id: 19, name: "City Backpack", category: "bags", price: 180000, image: "/products/bag-9.jpg" },
  { id: 20, name: "Luxury Backpack", category: "bags", price: 275000, image: "/products/bag-2.jpg" },
  { id: 21, name: "Everyday Backpack", category: "bags", price: 165000, image: "/products/bag-6.jpg" },
];

export const WHATSAPP = "256705127282";

export function formatUgx(amount: number) {
  return `UGX ${amount.toLocaleString("en-UG")}`;
}
