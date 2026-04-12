// Simple Node.js 
// require matlab — "yeh tool mujhe chahiye". http Node ka built-in tool hai jo server banana sikhata hai.
const http = require('http')
const querystring  = require('querystring')

// Server banao. Jab bhi koi request aaye, yeh function chalega.
// req = request → user ne kya maanga (browser ki taraf se aaya)
// res = response → tum kya jawab doge (server ki taraf se jaata hai)
const server = http.createServer((req, res) => {
    // 200 matlab "sab theek hai" — yeh HTTP status code hai.
    // Content - Type bata raha hai ki jawab plain text mein hai.
    // res.writeHead(200, { 'content-type': 'text/plain' })
    // Jawab bhejo aur connection band karo.


    if (req.method === 'GET' &&req.url === '/') {
        console.log(process)
        res.writeHead(200, { 'content-type': 'text/html' })
        // Jab tum thoda-thoda data bhejna chahte ho
        res.write(`
      <form action="/submit" method="post">
        <input type="text" name="username" placeholder="Enter your name" />
        <button type="submit">Submit</button>
      </form>
    `)
        res.end();
    } else if(req.method === 'POST' && req.url === '/submit'){
        let body = ''
        req.on('data',chunk=>{
            body += chunk.toString()
        })

        // Node process ko forcefully band karta hai
        // process.exit()

        req.on('end',()=>{
            const parserData = querystring.parse(body)
            const username = parserData.username
            res.writeHead(200,{"Content-Type": "text/plain" })
            res.write(`userName is: ${username}`)
            res.end()
        })
    }
    else if (req.url === '/about') {
        res.writeHead(200, { 'content-type': 'text/plain' })
        res.end('Yeh About Page hai!')
    } 
    else {
        res.writeHead(404, { 'content-type': 'text/plain' })
        res.end('404 - Page Nahi Mila!')
    }

    
})


/*
Thread Pool kya hota hai?
Sochlo ke ek restaurant hai. Agar har nayi order ke liye naya chef hire karo — bohat expensive aur slow hoga. Isliye ek fixed group of chefs (threads) rakhte hain jo orders (tasks) aati hain to uthate hain, complete karte hain, phir wapas ready ho jaate hain.
Yahi concept hai Thread Pool ka.

Andar ke 3 main parts:
1. Task Queue
Jab bhi koi kaam aata hai — database query, API call, file read — woh pehle ek line mein lagg jaata hai (queue). FIFO order mein process hota hai.
2. Thread Pool (Workers)
Fixed number of threads hamesha ready rehte hain. Jab koi thread free hota hai, woh queue se agla task utha leta hai. Thread na bana, na destroy — sirf reuse.
3. Thread States

Idle — free hai, kaam ka intezaar
Running — task execute kar raha hai
Done — task complete, wapas idle


*/


/*
🔹 3. process.nextTick(()=>{})

👉 Microtask queue me jata hai
👉 Sabse highest priority

es ka ander jo bhi Async kam hoga wo Sync khatam hone ka baad sabsa pahle chale ga kitne bhi Async kam ho kuch bhi ho sab sa phle es ka ander ka Async execute hoga Its like VIP in Async Codes

*/

// Node history
// Node Kasa chalta hai 
// Node Execute context
// Thread Pull

/*
Socho tumhara computer ek building hai. Us building mein hazaron darwaze (ports) hain.

Port 3000 → tumhara Node server ka darwaza
Port 80 → normal websites ka darwaza (HTTP)
Port 443 → secure websites ka darwaza (HTTPS)

Jab browser localhost:3000 pe jaata hai → woh port 3000 ka darwaza khadakhaata hai → tumhara server sunta hai → jawab deta hai.

*/
server.listen(3000, () => {
    console.log('Server chal raha hai port 3000 pe!');
});





// | Feature     | `res.setHeader()`                | `res.writeHead()`                   |
// | ----------- | -------------------------------- | ----------------------------------- |
// | Kaam        | sirf header set karta hai        | status + headers dono set karta hai |
// | Status code | ❌ nahi set karta                | ✅ set karta                         |
// | Timing      | multiple times call kar sakte ho | usually ek baar                     |
// | Control     | flexible                         | final-like                          |

/*
1. res.setHeader()
👉 Sirf header set kar raha hai
👉 response abhi send nahi hua
res.setHeader('content-type', 'application/json')
res.statusCode = 200
res.end(JSON.stringify({ name: "Aman" }))

Example:
res.setHeader('content-type', 'application/json')
res.statusCode = 200
res.end(JSON.stringify({ name: "Aman" }))
🔥 Key point:

👉 Tu alag-alag jagah pe headers set kar sakta hai

2. res.writeHead()
res.writeHead(200, { 'content-type': 'text/html' })
🧠 Meaning:

👉 Ek hi line me:

status code set
headers set
response start
📦 Example:
res.writeHead(200, { 'content-type': 'text/html' })
res.end("<h1>Hello</h1>")
*/

/*
Node khud batata hai:

req.on("end", () => {})

“Ab aur data nahi aayega”

🔥 But HOW does Node know? (real deep answer)

Isko samajhne ke liye thoda network + HTTP protocol samajhna padega.

📦 1. Browser kya karta hai internally

Jab tu form submit karta hai:

<form method="POST">

👉 Browser request bhejta hai kuch aisa:

POST /submit HTTP/1.1
Content-Length: 24

username=fullStrack
🧠 Key cheez:

👉 Content-Length: 24

Browser bol raha hai:
“Main total 24 bytes bhejne wala hoon”

⚙️ 2. Node kya karta hai

Node internally:

header padhta hai (Content-Length)
data chunks receive karta hai
count karta rehta hai bytes
🔁 Flow:
chunk 1 → 10 bytes
chunk 2 → 10 bytes
chunk 3 → 4 bytes

👉 total = 24 bytes

🎯 Jab match ho jata hai:

👉 Node bolta hai:

“Ho gaya — ab end event fire karo”

🔔 3. req.on("end") ka real meaning
req.on("end", () => {})

👉 Ye tab trigger hota hai jab:

saara data aa gaya
stream close ho gayi
🔥 4. Dusra case (important)

Kabhi-kabhi Content-Length nahi hota

👉 tab use hota hai:

Transfer-Encoding: chunked
🧠 Chunked transfer kya hai?

Browser bolta hai:

“Main data pieces me bhejunga, size pehle nahi bataunga”

Example:
7
username
9
=fullStr
3
ack
0

👉 last me 0 aata hai
👉 Node samajh jata hai: data khatam

⚡ Summary (clear)

Node ko pata chalne ke 2 tareeke:

1. Content-Length

👉 total size match ho gaya

2. Chunked encoding

👉 last chunk (0) aa gaya

🧠 Real-life analogy

Soch courier aa raha hai:

Case 1:

“Main 3 boxes bhej raha hoon”

👉 3 aa gaye → done

Case 2:

“Boxes bhej raha hoon, last pe ‘DONE’ likh dunga”

👉 DONE aaya → khatam

⚠️ Important insight

Tu kabhi manually check nahi karta:

if (dataComplete) ❌

👉 Node khud handle karta hai
👉 tu sirf event sunta hai:

req.on("end", ...)
🔥 BONUS (pro-level)

Ek aur event hota hai:

req.on("close", () => {})

👉 Ye tab fire hota hai jab:

client beech me disconnect ho gaya
data incomplete reh gaya
*/