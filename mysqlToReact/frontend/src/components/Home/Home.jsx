import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Home() {
  const slides = [
    "bg-[radial-gradient(circle_at_top_left,_#8ab4ff_0%,_#4f46e5_40%,_#0f172a_100%)]",
    "bg-[radial-gradient(circle_at_top_left,_#d8b4fe_0%,_#9333ea_45%,_#1e1b4b_100%)]",
    "bg-[radial-gradient(circle_at_top_left,_#fde68a_0%,_#f59e0b_40%,_#78350f_100%)]",
    "bg-[radial-gradient(circle_at_top_left,_#fda4af_0%,_#e11d48_45%,_#3f0014_100%)]",
  ];

  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      speed={2000}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {slides.map((bg, i) => (
        <SwiperSlide key={i}>
          <div
            className={`relative h-screen flex items-center justify-center text-white overflow-hidden ${bg}`}
          >
            <div className="absolute w-96 h-96 rounded-full bg-white/20 blur-[140px] top-10 left-10"></div>
            <div className="absolute w-80 h-80 rounded-full bg-white/10 blur-[120px] bottom-10 right-10"></div>

            <div className="z-10 text-center">
              <h1 className="text-7xl font-bold tracking-tight drop-shadow-2xl">
                Hello {i + 1}
                
              </h1>
              <p className="mt-4 text-white/70 text-xl">
                Beautiful Gradient Slider
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}