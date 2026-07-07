import React from "react";
import { Truck, MapPin, Phone, CreditCard } from "lucide-react";
import OrderProduct from "./Orderproductdata";

const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-700 border-amber-300",
  Shipped: "bg-blue-100 text-blue-700 border-blue-300",
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-300",
  Cancelled: "bg-red-100 text-red-700 border-red-300",
};

function OrderCard({ order }) {
  const statusClass =
    STATUS_STYLES[order.order_status] ||
    "bg-neutral-100 text-neutral-700 border-neutral-300";

  return (
    <div className="flex flex-col border border-neutral-900 bg-white text-neutral-900">
      {/* Header */}
      <div className="flex items-stretch justify-between border-b border-neutral-900">
        <div className="flex-1 px-4 py-3">
          <p className="text-xs text-neutral-400">Order #{order.order_id}</p>
          <p className="text-lg font-black leading-none tracking-tight">
            {order.product_name}
          </p>
        </div>
        <div
          className={`flex w-28 items-center justify-center border-l border-neutral-900 p-2 text-xs font-semibold ${statusClass}`}
        >
          {order.order_status}
        </div>
      </div>

      {/* Image */}
      <div className="aspect-[4/3] w-full border-b border-neutral-900 flex justify-center items-center bg-neutral-50">
        <img
          src={order.image}
          className="object-contain w-30 h-full"
          alt={order.product_name}
        />
      </div>

      {/* Price / Qty */}
      <div className="flex items-stretch justify-between text-xs border-b border-neutral-900">
        <div className="flex-1 space-y-1 px-4 py-3 text-neutral-500">
          <p>
            Qty <span className="text-neutral-900 font-medium">{order.quantity}</span>
          </p>
          <p>
            Price <span className="text-neutral-900 font-medium">₹{order.product_price}</span>
          </p>
        </div>
        <div className="flex-1 space-y-1 px-4 py-3 text-neutral-500 border-l border-neutral-900">
          <p>
            Total <span className="text-neutral-900 font-medium">₹{order.total_price}</span>
          </p>
          <p className="flex items-center gap-1">
            <CreditCard size={12} /> {order.payment_method}
          </p>
        </div>
      </div>

      {/* Delivery / address */}
      <div className="px-4 py-3 space-y-1.5 text-xs text-neutral-500">
        <p className="flex items-center gap-1.5">
          <Truck size={13} className="text-neutral-900 shrink-0" />
          {order.delivery_estimate} · ordered on{" "}
          {new Date(order.order_date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p className="flex items-start gap-1.5">
          <MapPin size={13} className="text-neutral-900 shrink-0 mt-0.5" />
          <span>
            {order.address_line2}, {order.city}, {order.state} - {order.pin_code}
          </span>
        </p>
        <p className="flex items-center gap-1.5">
          <Phone size={13} className="text-neutral-900 shrink-0" />
          {order.Phone_number} · {order.username}
        </p>
      </div>
    </div>
  );
}

export default function OrdereProduct() {
  const { data, isLoading } = OrderProduct();

  if (isLoading) {
    return <p className="px-6 py-10 text-sm text-neutral-400">Loading orders…</p>;
  }

  if (!data || data.length === 0) {
    return <p className="px-6 py-10 text-sm text-neutral-400">No orders found.</p>;
  }

  return (
    <div className="px-6 pb-8 pt-2">
      <h2 className="mb-4 text-base font-semibold text-neutral-900">
        Ordered Products ({data.length})
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((order) => (
          <OrderCard key={order.order_id} order={order} />
        ))}
      </div>
    </div>
  );
}