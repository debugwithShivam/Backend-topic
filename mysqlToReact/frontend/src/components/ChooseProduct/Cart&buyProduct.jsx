import React, { useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  Star,
  Heart,
  ChevronRight,
} from "lucide-react";

export default function CartbuyProduct() {
  useEffect(() => {
    console.log("hello");
  }, []);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <button className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
        <ShoppingCart className="h-4 w-4" />
        Add to Cart
      </button>
      <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-105">
        <ShoppingCart className="h-4 w-4" />
        Buy Now
      </button>
      <button className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <Heart className="h-4 w-4" />
        Save to Wishlist
      </button>
    </div>
  );
}
