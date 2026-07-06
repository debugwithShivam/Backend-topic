import React from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  Star,
  Heart,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function CartbuyProduct({ qty }) {
  let getOrderData = JSON.parse(localStorage.getItem("chooseProduct"));
  const totalProduct = getOrderData.price * qty;
  const queryClient = useQueryClient()

  async function orderProduct(params) {
    try {
      let sendResonse = await axios.post(
        "http://localhost:4876/auth/cartProduct",
        {
          product_id: getOrderData.id,
          quantity: qty,
          product_name: getOrderData.name,
          product_price: getOrderData.price,
          total_price: totalProduct,
          image: getOrderData.image,
          category: getOrderData.category,
        },
        { withCredentials: true },
      );
      queryClient.invalidateQueries({
        queryKey:['cartdata']
      })
    } catch (error) {
      console.log("Your request is faild because of this error", error);
    }
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <button className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-blue-700"  onClick={() => {
            console.log("clicked");
            orderProduct();
          }}>
        <ShoppingCart
          className="h-4 w-4"
         
        />
        Add to Cart
      </button>
      <Link to='/BuyOrder'>
        <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-105">
          <ShoppingCart className="h-4 w-4" />
          Buy Now
        </button>
      </Link>
      <button className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <Heart className="h-4 w-4" />
        Save to Wishlist
      </button>
    </div>
  );
}
