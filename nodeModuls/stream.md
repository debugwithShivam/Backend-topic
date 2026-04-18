# Streams in Node.js

Stream ek **continuous flow of data** hai — poora data ek saath load karne ki jagah, **chunks (tukdon) mein** process karta hai.

## Real Life Example

> **Bina stream ke:** Puri movie download karo, phir dekho
> **Stream ke saath:** Movie chalti rahe aur saath-saath download hoti rahe (Netflix style)

---

## 4 Types of Streams

### 1. 🟢 Readable Stream — Data padhna
```js
const fs = require("fs");

const readable = fs.createReadStream("bada-file.txt", { encoding: "utf8" });

readable.on("data", (chunk) => {
  console.log("Chunk mila:", chunk);        // ek tukda aya
});

readable.on("end", () => {
  console.log("Poora file padh liya");
});

readable.on("error", (err) => {
  console.error("Error:", err);
});
```

---

### 2. 🔴 Writable Stream — Data likhna
```js
const fs = require("fs");

const writable = fs.createWriteStream("output.txt");

writable.write("Pehli line\n");
writable.write("Doosri line\n");
writable.end("Aakhri line");              // stream band karo

writable.on("finish", () => {
  console.log("File likh di!");
});
```

---

### 3. 🟡 Duplex Stream — Padhna + Likhna dono
```js
const net = require("net");

// TCP socket ek duplex stream hai
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    socket.write("Tumne bheja: " + data); // padha bhi, likha bhi
  });
});

server.listen(3000);
```

---

### 4. 🔵 Transform Stream — Data badal ke aage bhejta hai
```js
const { Transform } = require("stream");

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase()); // data badal diya
    callback();
  },
});

process.stdin.pipe(upperCase).pipe(process.stdout);
// jo bhi likho → UPPERCASE hokar dikhega
```

---

## Pipe — Streams ko jodhna

```js
const fs = require("fs");
const zlib = require("zlib");

// File padho → compress karo → nayi file mein likho
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip())               // compress
  .pipe(fs.createWriteStream("input.txt.gz")); // save

console.log("File compress ho rahi hai...");
```

---

## Bina Stream vs Stream — Fark

```js
// ❌ Bina stream — poori file RAM mein load hogi
const fs = require("fs");
fs.readFile("10GB-file.txt", (err, data) => {
  console.log(data); // 10GB RAM chahiye!
});

// ✅ Stream ke saath — sirf ek chunk RAM mein
fs.createReadStream("10GB-file.txt")
  .on("data", (chunk) => {
    console.log(chunk); // thoda thoda process karo
  });
```

---

## Stream Events — Yaad rakho

| Event | Kab fire hota hai |
|---|---|
| `data` | Naya chunk aya |
| `end` | Readable stream khatam |
| `finish` | Writable stream khatam |
| `error` | Kuch galat hua |
| `close` | Stream band hua |

---

## Practical Example — HTTP Server with Stream

```js
const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  // ❌ Bura tarika
  // fs.readFile("video.mp4", (err, data) => res.end(data));

  // ✅ Achha tarika — stream karo
  const stream = fs.createReadStream("video.mp4");
  stream.pipe(res);                        // file seedha response mein
}).listen(3000);
```

---

## Summary

```
Readable  →  data source   (file, stdin, HTTP request)
Writable  →  data dest     (file, stdout, HTTP response)
Duplex    →  dono          (TCP socket, WebSocket)
Transform →  modify karo   (compression, encryption)

.pipe() se streams ko chain karo → memory efficient!
```

