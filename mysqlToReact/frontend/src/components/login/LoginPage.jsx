import React from "react";
import AuthLogin from "./AuthLogin";
import gradient from "./gradient.png";
import SplineScene from "./Module";
export default function LoginPage() {
  return (
    <div className=" bg-black  text-white leading-[1.5] h-screen  ">
      <img
        src={gradient}
        className="absolute top-0 right-0 opacity-[0.5] "
        alt="gradient"
      />
      <div className="absolute right-0 top-[20%] h-40 w-40 rounded-full bg-white blur-[120px] opacity-80"></div>
      <div className="text-white  w-screen margin-[0 auto] p-2 relative overflow-hidden">
        <header className="flex z-[999] justify-between items-center p-[1rem 5rem]">
          <h1 className="m-0 text-[3rem] font-light">MCODE</h1>
          <nav className="flex items-center gap-6">
            {["HOME", "PRODUCT", "ORDERS", "SETTING"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm tracking-widest text-white/70 hover:text-white transition-colors duration-200 no-underline"
              >
                {link}
              </a>
            ))}
          </nav>
          <button className="bg-[#a7a7a7] rounded-2xl text-black pl-1 pr-1 p-1 border-none text-[1rem] font-medium transition-backgroung-color duration-[0.2] ease pointer-events-auto hover:bg-white">
            SINGING
          </button>
        </header>
        <div className="flex flex-1 items-center overflow-hidden">


          <div className="w-full flex items-center justify-center pr-16">
            <AuthLogin />
          </div>
          <div className="flex h-full ">
            <SplineScene />
          </div>

        </div>
      </div>
    </div>
  );
}
