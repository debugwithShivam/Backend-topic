import { useState } from 'react'

function About() {
  const [count, setCount] = useState(0)

  return (
      <div className="about">
      <section className="about-hero">
        <h1 className="about-title">About Me</h1>
        <p className="about-subtitle">
          I’m not here to “learn coding”. I’m here to understand how systems work.
        </p>
      </section>

      <section className="about-content">
        <div className="card">
          <h2>Who I Am</h2>
          <p>
            I’m a developer focused on mastering fundamentals: how browsers work,
            how JavaScript executes, how the web actually moves data.
          </p>
        </div>

        <div className="card">
          <h2>What I Do</h2>
          <p>
            I build modern web apps using React, Node.js, and real engineering
            principles — not just copy-paste tutorials.
          </p>
        </div>

        <div className="card">
          <h2>My Goal</h2>
          <p>
            To surpass average developers by understanding the internals:
            memory, event loops, compilers, networks, and system design.
          </p>
        </div>
      </section>
    </div>
  )
}

export default About
