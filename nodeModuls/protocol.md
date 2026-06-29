1. http (HTTP/1.1)
✅ What it is:

Node’s built-in module to create normal web servers using the HTTP protocol.

const http = require('http')

http.createServer((req, res) => {
  res.end('Hello World')
}).listen(3000)
🧠 How it works internally:
Uses TCP connection
Sends requests in plain text
Follows request → response model
One request per connection (mostly)
❌ Problems:
No encryption (data is visible → unsafe)
Slower for modern apps
Head-of-line blocking (one request blocks others)

----------------------------------------------------------

2. https (HTTP + SSL/TLS)
✅ What it is:

Same as http, but secure version.

const https = require('https')
🧠 What changes internally:
Adds SSL/TLS encryption layer
Data is encrypted before sending
Uses certificates (like .pem, .key)
🔐 Why it exists:

Without HTTPS:

Passwords can be stolen
Data can be intercepted

With HTTPS:

Data is encrypted → safe communication
💡 Real-world:

Every modern website (Google, YouTube) uses HTTPS.

-------------------------------------------------------------

3. http2 (Modern HTTP)
✅ What it is:

New version of HTTP → faster and smarter

const http2 = require('http2')
⚡ Key features (this is where things get interesting):
1. Multiplexing

👉 Multiple requests in one connection

Old (http):

Request 1 → wait → Response 1
Request 2 → wait → Response 2

HTTP/2:

Request 1 ─┐
Request 2 ─┼── all at once
Request 3 ─┘



