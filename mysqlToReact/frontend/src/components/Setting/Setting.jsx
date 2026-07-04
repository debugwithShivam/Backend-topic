import React, { useState } from "react";
import {
  ShoppingCart,
  CreditCard,
  Globe,
  Moon,
  Sun,
  LogOut,
  Mail,
  AtSign,
  Package,
  ChevronDown,
  Bell,
  ShieldCheck,
  Trash2,
  Pencil,
  Check,
  MoreHorizontal,
  Truck,
} from "lucide-react";

// ---- Mock data (replace with real data from your store / API) ----
const cartItems = [
  { id: "#CT-104", name: "Wireless Headphones", qty: 2, price: 4599, addedDaysAgo: 2, status: "In cart" },
  { id: "#CT-098", name: "Mechanical Keyboard", qty: 1, price: 6499, addedDaysAgo: 4, status: "In cart" },
  { id: "#CT-087", name: "Smart Watch Series 5", qty: 1, price: 12999, addedDaysAgo: 6, status: "Buy now" },
  { id: "#CT-076", name: "USB-C Fast Charger", qty: 3, price: 999, addedDaysAgo: 9, status: "In cart" },
  { id: "#CT-061", name: "Laptop Sleeve 14-inch", qty: 1, price: 1299, addedDaysAgo: 15, status: "Buy now" },
];

const orderedDetail = {
  id: "#CT-087",
  name: "Smart Watch Series 5",
  brand: "PulseTech",
  unitPrice: 12999,
  quantity: 1,
  subtotal: 12999,
  tax: 1039.92,
  balanceDue: 14038.92,
  customer: { name: "Maria Jones", email: "maria.jones@example.com" },
};

const cards = [
  { id: "4443", brand: "Visa", pending: 8420 },
  { id: "7220", brand: "Amex", pending: 0, selected: true },
  { id: "1720", brand: "PayPal", pending: 3210 },
];

export default function Setting() {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);
  const [selectedItem, setSelectedItem] = useState(cartItems[2].id);
  const [activeFilter, setActiveFilter] = useState("All");

  const isDark = theme === "dark";

  const cartTotal = cartItems.reduce((sum, i) => sum + i.qty * i.price, 0);
  const boughtTotal = cartItems
    .filter((i) => i.status === "Buy now")
    .reduce((sum, i) => sum + i.qty * i.price, 0);
  const cardDueTotal = cards.reduce((sum, c) => sum + c.pending, 0);

  const filters = ["All", "In cart", "Buy now"];
  const filteredItems =
    activeFilter === "All" ? cartItems : cartItems.filter((i) => i.status === activeFilter);

  const formatINR = (n) =>
    n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDark ? "bg-[#0D0E10] text-zinc-100" : "bg-[#F4F5F7] text-zinc-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
            <p className={`text-sm mt-1 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
              Manage your account, orders and preferences
            </p>
          </div>
          <button
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium border transition-colors ${
              isDark
                ? "border-zinc-800 hover:bg-zinc-900 text-zinc-300"
                : "border-zinc-200 hover:bg-white text-zinc-600"
            }`}
          >
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Top stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            isDark={isDark}
            icon={<ShoppingCart size={16} />}
            label="Items in cart"
            value={`₹${formatINR(cartTotal)}`}
            sub={`${cartItems.length} products`}
          />
          <StatCard
            isDark={isDark}
            icon={<Package size={16} />}
            label="Total ordered"
            value={`₹${formatINR(boughtTotal)}`}
            sub="Buy now purchases"
          />
          <StatCard
            isDark={isDark}
            icon={<CreditCard size={16} />}
            label="Card balance due"
            value={`₹${formatINR(cardDueTotal)}`}
            sub="Across all cards"
          />
          <StatCard
            isDark={isDark}
            icon={<Truck size={16} />}
            label="Avg. delivery time"
            value="4 days"
            sub="Last 6 orders"
            barChart
          />
        </div>

        {/* Cards / payout style panel */}
        <div
          className={`rounded-2xl p-5 border ${
            isDark ? "bg-[#141518] border-zinc-800" : "bg-white border-zinc-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium">Saved cards</p>
            <span className="text-xs text-zinc-500">Total pending ₹{formatINR(cardDueTotal)}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {cards.map((c) => (
              <div
                key={c.id}
                className={`rounded-xl p-4 border flex flex-col gap-3 ${
                  c.selected
                    ? "bg-[#C6F135] border-[#C6F135] text-black"
                    : isDark
                    ? "bg-[#1A1B1E] border-zinc-800"
                    : "bg-zinc-50 border-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wide">{c.brand}</span>
                  <span className="text-xs opacity-70">•••• {c.id}</span>
                </div>
                <div>
                  <p className="text-xs opacity-70">Pending</p>
                  <p className="text-lg font-semibold">₹{formatINR(c.pending)}</p>
                </div>
                <button
                  className={`text-xs font-medium rounded-lg py-1.5 ${
                    c.selected
                      ? "bg-black text-[#C6F135]"
                      : isDark
                      ? "bg-zinc-800 text-zinc-200"
                      : "bg-white text-zinc-700 border border-zinc-200"
                  }`}
                >
                  Pay now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-sm px-3.5 py-1.5 rounded-lg border transition-colors ${
                activeFilter === f
                  ? "bg-[#C6F135] text-black border-[#C6F135] font-medium"
                  : isDark
                  ? "border-zinc-800 text-zinc-400 hover:bg-zinc-900"
                  : "border-zinc-200 text-zinc-500 hover:bg-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cart list + detail */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark ? "border-zinc-800" : "border-zinc-200"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* List */}
            <div className={`lg:col-span-2 border-r ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
              <div
                className={`px-5 py-3 text-xs font-medium uppercase tracking-wide ${
                  isDark ? "text-zinc-500 bg-[#141518]" : "text-zinc-500 bg-zinc-50"
                }`}
              >
                My products ({filteredItems.length})
              </div>
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`w-full text-left px-5 py-3.5 flex items-center justify-between border-t transition-colors ${
                    isDark ? "border-zinc-800" : "border-zinc-100"
                  } ${
                    selectedItem === item.id
                      ? isDark
                        ? "bg-[#1A1B1E]"
                        : "bg-zinc-50"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        isDark ? "bg-zinc-800" : "bg-zinc-100"
                      }`}
                    >
                      <Package size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.id}</p>
                      <p className="text-xs text-zinc-500">{item.addedDaysAgo} days ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">₹{formatINR(item.qty * item.price)}</p>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full ${
                        item.status === "Buy now"
                          ? "bg-[#C6F135] text-black"
                          : isDark
                          ? "bg-zinc-800 text-zinc-300"
                          : "bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail */}
            <div className={`lg:col-span-3 p-5 ${isDark ? "bg-[#141518]" : "bg-white"}`}>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Product details</p>
                  <p className="text-lg font-semibold">{orderedDetail.id}</p>
                  <p className="text-sm text-zinc-500">{orderedDetail.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500 mb-1">Customer</p>
                  <p className="text-sm font-medium">{orderedDetail.customer.name}</p>
                  <p className="text-xs text-zinc-500">{orderedDetail.customer.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <MiniStat isDark={isDark} label="Unit price" value={`₹${formatINR(orderedDetail.unitPrice)}`} />
                <MiniStat isDark={isDark} label="Quantity" value={orderedDetail.quantity} />
                <MiniStat isDark={isDark} label="Tax" value={`₹${formatINR(orderedDetail.tax)}`} />
              </div>

              <div
                className={`rounded-xl p-4 flex items-center justify-between border ${
                  isDark ? "border-zinc-800" : "border-zinc-200"
                }`}
              >
                <div>
                  <p className="text-xs text-zinc-500">Balance due</p>
                  <p className="text-xl font-semibold">₹{formatINR(orderedDetail.balanceDue)}</p>
                </div>
                <button className="bg-[#C6F135] text-black text-sm font-medium px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                  Pay now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile + Preferences */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Profile */}
          <div
            className={`rounded-2xl p-5 border ${
              isDark ? "bg-[#141518] border-zinc-800" : "bg-white border-zinc-200"
            }`}
          >
            <p className="text-sm font-medium mb-4">Profile</p>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-14 w-14 rounded-full bg-[#C6F135] flex items-center justify-center text-black font-semibold text-lg">
                MJ
              </div>
              <div>
                <p className="font-medium">Maria Jones</p>
                <p className="text-xs text-zinc-500">@mariajones</p>
              </div>
              <button
                className={`ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${
                  isDark ? "border-zinc-800 hover:bg-zinc-900" : "border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                <Pencil size={12} /> Edit
              </button>
            </div>

            <div className="space-y-3">
              <FieldRow isDark={isDark} icon={<AtSign size={14} />} label="Username" value="mariajones" />
              <FieldRow isDark={isDark} icon={<Mail size={14} />} label="Email" value="maria.jones@example.com" />
            </div>
          </div>

          {/* Preferences */}
          <div
            className={`rounded-2xl p-5 border space-y-1 ${
              isDark ? "bg-[#141518] border-zinc-800" : "bg-white border-zinc-200"
            }`}
          >
            <p className="text-sm font-medium mb-3">Preferences</p>

            {/* Language */}
            <PrefRow isDark={isDark} icon={<Globe size={16} />} label="Language">
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`appearance-none text-sm pl-3 pr-8 py-1.5 rounded-lg border cursor-pointer ${
                    isDark
                      ? "bg-[#1A1B1E] border-zinc-800 text-zinc-200"
                      : "bg-zinc-50 border-zinc-200 text-zinc-700"
                  }`}
                >
                  <option>English</option>
                  <option>हिन्दी</option>
                  <option>Español</option>
                  <option>Français</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-2 pointer-events-none opacity-60" />
              </div>
            </PrefRow>

            {/* Theme */}
            <PrefRow isDark={isDark} icon={isDark ? <Moon size={16} /> : <Sun size={16} />} label="Appearance">
              <div
                className={`flex items-center rounded-lg p-1 border ${
                  isDark ? "border-zinc-800 bg-[#1A1B1E]" : "border-zinc-200 bg-zinc-50"
                }`}
              >
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md ${
                    !isDark ? "bg-[#C6F135] text-black font-medium" : "text-zinc-400"
                  }`}
                >
                  <Sun size={12} /> Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md ${
                    isDark ? "bg-[#C6F135] text-black font-medium" : "text-zinc-400"
                  }`}
                >
                  <Moon size={12} /> Dark
                </button>
              </div>
            </PrefRow>

            {/* Notifications */}
            <PrefRow isDark={isDark} icon={<Bell size={16} />} label="Order notifications">
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-10 h-6 rounded-full relative transition-colors ${
                  notifications ? "bg-[#C6F135]" : isDark ? "bg-zinc-800" : "bg-zinc-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    notifications ? "translate-x-[18px]" : "translate-x-0.5"
                  }`}
                />
              </button>
            </PrefRow>

            {/* Two-factor */}
            <PrefRow isDark={isDark} icon={<ShieldCheck size={16} />} label="Two-factor authentication">
              <span
                className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 ${
                  isDark ? "bg-zinc-800 text-zinc-300" : "bg-zinc-100 text-zinc-600"
                }`}
              >
                <Check size={12} /> Enabled
              </span>
            </PrefRow>

            <div className={`h-px my-3 ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`} />

            <button
              className={`w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-xl border transition-colors ${
                isDark
                  ? "border-zinc-800 text-zinc-300 hover:bg-zinc-900"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <LogOut size={15} /> Log out
            </button>

            <button className="w-full flex items-center justify-center gap-2 text-sm py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors">
              <Trash2 size={15} /> Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ isDark, icon, label, value, sub, barChart }) {
  return (
    <div
      className={`rounded-2xl p-4 border ${
        isDark ? "bg-[#141518] border-zinc-800" : "bg-white border-zinc-200"
      }`}
    >
      <div className="flex items-center gap-2 text-zinc-500 text-xs mb-2">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-xl font-semibold mb-1">{value}</p>
      <p className="text-xs text-zinc-500">{sub}</p>
      {barChart && (
        <div className="flex items-end gap-1 mt-3 h-6">
          {[4, 7, 5, 9, 6, 8, 5].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h * 3}px` }}
              className={`w-1.5 rounded-full ${i === 5 ? "bg-[#C6F135]" : isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MiniStat({ isDark, label, value }) {
  return (
    <div className={`rounded-xl p-3 border ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function FieldRow({ isDark, icon, label, value }) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-3 py-2.5 border ${
        isDark ? "border-zinc-800 bg-[#1A1B1E]" : "border-zinc-200 bg-zinc-50"
      }`}
    >
      <div className="flex items-center gap-2 text-zinc-500 text-xs">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-sm">{value}</span>
    </div>
  );
}

function PrefRow({ isDark, icon, label, children }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-2.5 text-sm">
        <span className="text-zinc-500">{icon}</span>
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
