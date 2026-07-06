import React, { useState } from "react";

const orderSteps = [
  { id: 1, label: "Information" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Complete" },
];



function InputFields({ label, ...rest }) {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={label}
        className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8377] mb-1.5"
      >
        {label}
      </label>
      <input
        {...rest}
        id={label}
        className="outline-none border border-[#DED7C7] bg-white rounded-md px-3 py-2.5 w-full text-[15px] text-[#1C1B1A] placeholder:text-[#B7B0A2] transition-colors focus:border-[#B23A2E] focus:ring-2 focus:ring-[#B23A2E]/10"
      />
    </div>
  );
}

function Perforation({ className = "" }) {
  const dots = Array.from({ length: 26 });
  return (
    <div className={`flex justify-between px-3 ${className}`} aria-hidden="true">
      {dots.map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-[#FAF8F3]"
        />
      ))}
    </div>
  );
}

function Barcode() {
  const widths = [2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 4, 1, 2, 1, 3, 1, 2];
  return (
    <div className="flex items-end gap-[2px] h-10" aria-hidden="true">
      {widths.map((w, i) => (
        <div
          key={i}
          style={{ width: `${w * 2}px` }}
          className="bg-[#1C1B1A] h-full"
        />
      ))}
    </div>
  );
}

export default function BuyOrder() {
  const [activeStep, setActiveStep] = useState(1);

  let productdata;
  try {
    productdata = JSON.parse(localStorage.getItem("chooseProduct")) || [];
  } catch {
    productdata = FALLBACK_PRODUCT;
  }

  const total = (Number(productdata.price) || 0) * (Number(productdata.quantity) || 1);
  const orderNumber = "ORD-" + String(Math.abs(hashCode(productdata.name || "order"))).slice(0, 6);

  const handleProceed = () => {
    setActiveStep((s) => Math.min(s + 1, 3));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] py-14 px-5">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .font-receipt { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .font-ui { font-family: 'Inter', system-ui, sans-serif; }
        .dashed-row { border-bottom: 1.5px dashed #DED7C7; }
      `}</style>

      <div className="max-w-5xl mx-auto font-ui">
        <div className="mb-8">
          <p className="font-receipt text-[11px] tracking-[0.2em] text-[#8A8377] uppercase mb-1">
            Checkout · {orderNumber}
          </p>
          <h1 className="text-[32px] font-bold text-[#1C1B1A] tracking-tight">
            Complete your order
          </h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center mb-8">
          {orderSteps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2.5">
                <div
                  className={`font-receipt flex items-center justify-center w-8 h-8 rounded-full text-[13px] font-semibold border-2 transition-colors ${
                    activeStep >= step.id
                      ? "bg-[#1C1B1A] border-[#1C1B1A] text-white"
                      : "border-[#DED7C7] text-[#B7B0A2]"
                  }`}
                >
                  {String(step.id).padStart(2, "0")}
                </div>
                <span
                  className={`text-sm font-semibold uppercase tracking-wide ${
                    activeStep >= step.id ? "text-[#1C1B1A]" : "text-[#B7B0A2]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < orderSteps.length - 1 && (
                <div className="flex-1 h-px bg-[#DED7C7] mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
          {/* Form card */}
          <div className="bg-white rounded-2xl border border-[#EFE9DC] shadow-sm p-7">
            <h2 className="text-lg font-bold text-[#1C1B1A] mb-5">
              Delivery details
            </h2>

            <div className="flex gap-4">
              <InputFields label="Name" placeholder="Enter your name" />
              <InputFields label="Phone No" placeholder="Enter phone number" />
            </div>
            <InputFields label="Delivery Address" placeholder="Enter address" />
            <InputFields label="Email Address" placeholder="Enter email" />
            <div className="flex gap-4">
              <InputFields label="City" placeholder="Enter city" />
              <InputFields label="State" placeholder="Enter state" />
            </div>
            <div className="flex gap-4">
              <InputFields label="Pin Code" placeholder="Enter pin code" />
              <InputFields label="Quantity" type="number" placeholder="Enter quantity" />
            </div>

            <button
              onClick={handleProceed}
            
              className="bg-[#1C1B1A] hover:bg-[#B23A2E] text-white font-semibold text-sm uppercase tracking-wide py-3.5 w-full rounded-xl mt-3 transition-colors"
            >
              {activeStep < 3 ? "Continue to payment" : "Order placed"}
            </button>
          </div>

          {/* Receipt-style order summary */}
          <div>
          <div className="bg-white rounded-t-xl shadow-sm border border-[#EFE9DC] border-b-0 relative">
            <div className="p-7 font-receipt">
              <div className="text-center mb-5">
                <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#1C1B1A]">
                  Order Receipt
                </p>
                <p className="text-[11px] text-[#8A8377] mt-1">{orderNumber}</p>
              </div>

              {productdata.image && (
                <div className="flex justify-center mb-5">
                  <img
                    src={productdata.image}
                    alt={productdata.name}
                    className="h-40 object-contain"
                  />
                </div>
              )}

              <div className="space-y-2.5 text-[13px]">
                <Row label="Product" value={productdata.name} />
                <Row label="Brand" value={productdata.brand} />
                <Row label="Category" value={productdata.category} />
                <Row label="Rating" value={`${productdata.rating} / 5`} />
                <Row label="Unit price" value={`₹ ${productdata.price}`} />
                <Row label="Quantity" value={`× ${productdata.quantity}`} />
              </div>

              <div className="dashed-row my-4" />

              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold uppercase tracking-wide text-[#1C1B1A]">
                  Total
                </span>
                <span className="text-2xl font-bold text-[#B23A2E]">
                  ₹ {total.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between items-end mt-6">
                <Barcode />
                <span className="text-[10px] text-[#B7B0A2]">THANK YOU</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#EFE9DC] border-t-0 rounded-b-xl pt-1 pb-3 shadow-sm">
            <Perforation />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[#8A8377]">{label}</span>
      <span className="text-[#1C1B1A] font-medium text-right truncate max-w-[60%]">
        {value}
      </span>
    </div>
  );
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
