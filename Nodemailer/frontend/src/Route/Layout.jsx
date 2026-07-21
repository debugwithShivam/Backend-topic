import React from 'react'
import {Link, Outlet} from 'react-router-dom'

export default function Layout() {
  return (
    <>
     <nav className="navbar">
        <h2>SocialHub</h2>

    <header>
      <Link to='/' >Home</Link>
      <Link to='/about' >About</Link>
    </header>
        <div className="profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
          />
        </div>
      </nav>
    <Outlet/>
    </>
  )
}
