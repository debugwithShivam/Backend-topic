import React from "react";

export default function Home() {
  return (
    <div className="home">

      <div className="container">
        <aside className="sidebar">
          <ul>
            <li>🏠 Home</li>
            <li>👤 Profile</li>
            <li>💬 Messages</li>
            <li>🔔 Notifications</li>
            <li>⚙ Settings</li>
          </ul>
        </aside>

        {/* Feed */}
        <main className="feed">

          <div className="create-post">
            <textarea placeholder="What's on your mind?" />
            <button>Post</button>
          </div>

          <div className="post">
            <h3>John Doe</h3>
            <p>Learning React is awesome! 🚀</p>

            <div className="actions">
              <button>❤️ Like</button>
              <button>💬 Comment</button>
              <button>🔄 Share</button>
            </div>
          </div>

          <div className="post">
            <h3>Sarah</h3>
            <p>Today I completed my first React project.</p>

            <div className="actions">
              <button>❤️ Like</button>
              <button>💬 Comment</button>
              <button>🔄 Share</button>
            </div>
          </div>

        </main>

        {/* Right Sidebar */}
        <aside className="friends">
          <h3>Online Friends</h3>

          <div className="friend">🟢 Alex</div>
          <div className="friend">🟢 Emma</div>
          <div className="friend">🟢 David</div>
          <div className="friend">🟢 Sophia</div>
        </aside>

      </div>

    </div>
  );
}