import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <header className="flex z-[999] justify-between items-center p-[1rem 5rem]">
          <h1 className="m-0 text-[3rem] font-light">MCODE</h1>
          <nav className="flex items-center gap-6">
           <Link to='/' ><h1>Home</h1></Link>
           <Link to='/Product' ><h1>Product</h1></Link>
           <Link to='/Order' ><h1>Order</h1></Link>
           <Link to='/setting' ><h1>Setting</h1></Link>
          </nav>
          <button className="bg-[#a7a7a7] rounded-2xl text-black pl-1 pr-1 p-1 border-none text-[1rem] font-medium transition-backgroung-color duration-[0.2] ease pointer-events-auto hover:bg-white">
            SINGING
          </button>
        </header>
        <div className="">
          <Outlet/>
        </div>
    </div>
  )
}
